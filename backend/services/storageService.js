const path = require('path');
const fs = require('fs');
const { UTApi } = require('uploadthing/server');

// Initialize UploadThing
let utapi;
if (process.env.UPLOADTHING_SECRET && process.env.UPLOADTHING_APP_ID) {
  const tokenData = {
    apiKey: process.env.UPLOADTHING_SECRET,
    appId: process.env.UPLOADTHING_APP_ID,
    regions: ["sea1"]
  };
  const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');
  utapi = new UTApi({ token });
}
const cloudinary = require('cloudinary').v2;

/**
 * Storage Service Abstraction
 * Configured for Cloudinary Cloud Storage with local fallback.
 */

const UPLOAD_DIR = path.join(__dirname, '../uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

class StorageService {
  constructor() {
    this.initCloudinary();
  }

  initCloudinary() {
    this.cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    this.apiKey = process.env.CLOUDINARY_API_KEY;
    this.apiSecret = process.env.CLOUDINARY_API_SECRET;

    this.isConfigured = !!(this.cloudName && this.apiKey && this.apiSecret);

    if (this.isConfigured) {
      cloudinary.config({
        cloud_name: this.cloudName,
        api_key: this.apiKey,
        api_secret: this.apiSecret
      });
      console.log('✅ Cloudinary Storage Service initialized successfully.');
    } else {
      console.log('ℹ️ Cloudinary credentials missing. Using local storage fallback.');
    }
  }

  isCloudinaryEnabled() {
    if (!this.isConfigured) {
      this.initCloudinary();
    }
    return this.isConfigured;
  }

  async uploadFile(file, folder = 'Library') {
    if (!file) return null;

    // Use UploadThing for files > 9MB (Cloudinary Free Tier limit is 10MB)
    const isOverCloudinaryLimit = file.size && file.size > 9 * 1024 * 1024;

    if (isOverCloudinaryLimit && utapi) {
      try {
        console.log(`File size is ${file.size}, routing to UploadThing...`);
        const FileConstructor = global.File || require('buffer').File;
        const utFile = new FileConstructor([file.buffer], file.originalname || 'file.pdf', { type: file.mimetype });
        
        const response = await utapi.uploadFiles([utFile]);
        if (response && response[0] && response[0].data) {
          return response[0].data.url;
        } else {
          throw new Error('UploadThing upload failed or returned no URL');
        }
      } catch (error) {
        console.error('UploadThing upload error:', error);
        throw error;
      }
    }

    if (this.isCloudinaryEnabled()) {
      return new Promise((resolve, reject) => {
        const mimeType = file.mimetype || '';
        const originalName = file.originalname || '';
        const isPdfOrDoc =
          mimeType === 'application/pdf' ||
          mimeType.startsWith('application/') ||
          /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i.test(originalName);

        const resourceType = isPdfOrDoc ? 'raw' : 'auto';

        const uploadStream = cloudinary.uploader.upload_chunked_stream(
          {
            folder: `Live Sprach Zentrum/${folder}`,
            resource_type: resourceType,
            chunk_size: 6000000 // 6MB chunks to bypass the 10MB direct upload limit
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(new Error(`Cloudinary upload failed: ${error.message}`));
            }
            resolve(result.secure_url);
          }
        );

        if (file.buffer) {
          uploadStream.end(file.buffer);
        } else if (file.path && fs.existsSync(file.path)) {
          fs.createReadStream(file.path).pipe(uploadStream);
        } else {
          reject(new Error('No valid file buffer or path provided for upload'));
        }
      });
    }


    // Check if it is a full URL (already uploaded or fallback): Write buffer to disk if it came from memory storage
    let filename = file.filename;
    if (!filename && file.buffer) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname || '');
      filename = `${file.fieldname || 'file'}-${uniqueSuffix}${ext}`;
      fs.writeFileSync(path.join(UPLOAD_DIR, filename), file.buffer);
    } else if (!filename) {
      throw new Error('File object is missing buffer and filename');
    }

    // Return full server URL for the file
    const baseUrl = process.env.BASE_URL || 'http://localhost:5001';
    return `${baseUrl}/uploads/${filename}`;
  }

  getFileUrl(file) {
    if (!file) return null;
    if (typeof file === 'string') return file;
    if (file.secure_url) return file.secure_url;
    if (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://'))) {
      return file.path;
    }
    return `/uploads/${file.filename}`;
  }

  async deleteFile(fileUrl) {
    if (!fileUrl) return;

    if (fileUrl.includes('utfs.io')) {
      try {
        const fileKey = fileUrl.split('/').pop();
        if (fileKey) {
          await utapi.deleteFiles([fileKey]);
          console.log(`🗑️ Deleted file from UploadThing: ${fileKey}`);
        }
      } catch (err) {
        console.error(`Failed to delete UploadThing file ${fileUrl}:`, err);
      }
      return;
    }

    if (fileUrl.includes('cloudinary.com')) {
      if (!this.isCloudinaryEnabled()) {
        this.initCloudinary();
      }
      try {
        const urlParts = fileUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex !== -1) {
          const pathAfterUpload = urlParts.slice(uploadIndex + 1);
          const publicPathParts = pathAfterUpload[0].startsWith('v') ? pathAfterUpload.slice(1) : pathAfterUpload;
          const fullPathWithExt = publicPathParts.join('/');
          const cleanPath = fullPathWithExt.replace(/:\d+$/, '');
          const lastDotIndex = cleanPath.lastIndexOf('.');
          const publicId = lastDotIndex !== -1 ? cleanPath.substring(0, lastDotIndex) : cleanPath;

          await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' }).catch(() => {});
          await cloudinary.uploader.destroy(publicId, { resource_type: 'image' }).catch(() => {});
          await cloudinary.uploader.destroy(publicId, { resource_type: 'video' }).catch(() => {}); // audio is 'video' in cloudinary
          console.log(`🗑️ Deleted file from Cloudinary: ${publicId}`);
        }
      } catch (err) {
        console.error(`Failed to delete Cloudinary file ${fileUrl}:`, err);
      }
      return;
    }

    if (fileUrl.startsWith('/uploads/')) {
      const filename = fileUrl.replace('/uploads/', '');
      const filePath = path.join(UPLOAD_DIR, filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️ Deleted local file: ${filePath}`);
        } catch (err) {
          console.error(`Failed to delete local file ${filePath}:`, err);
        }
      }
    }
  }
}

module.exports = new StorageService();
