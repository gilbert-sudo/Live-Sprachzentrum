const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const memoryStorage = multer.memoryStorage();

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf',
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav',
    'audio/wave',
    'audio/x-pn-wav',
    'audio/x-m4a',
    'audio/m4a',
    'audio/aac',
    'audio/ogg',
    'audio/webm',
    'audio/flac',
    'audio/mp4',
    'video/mpeg' // MPEG audio files are frequently identified as video/mpeg by browsers/OS
  ];

  const ext = path.extname(file.originalname || '').toLowerCase();
  const allowedExtensions = [
    '.jpg', '.jpeg', '.png', '.webp', '.pdf',
    '.mp3', '.wav', '.mpeg', '.mpg', '.m4a', '.aac', '.ogg', '.weba', '.flac'
  ];

  const isAudioOrMedia =
    (file.mimetype && (file.mimetype.startsWith('audio/') || allowedMimeTypes.includes(file.mimetype))) ||
    allowedExtensions.includes(ext) ||
    /\.(mp3|wav|mpeg|mpg|m4a|aac|ogg|weba|flac)$/i.test(file.originalname || '');

  if (isAudioOrMedia) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}. Only JPEG, PNG, WEBP, PDF, and Audio files (MP3, WAV, MPEG, M4A) are allowed.`), false);
  }
};

const storage = {
  _handleFile: (req, file, cb) => {
    const engine = isCloudinaryConfigured() ? memoryStorage : diskStorage;
    engine._handleFile(req, file, cb);
  },
  _removeFile: (req, file, cb) => {
    const engine = isCloudinaryConfigured() ? memoryStorage : diskStorage;
    engine._removeFile(req, file, cb);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 512 * 1024 * 1024 // 512 MB limit per file (allows at least 300 MB)
  }
});

// Helper for library uploads (Cover image + PDF/Audio file)
const libraryUploadFields = upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);

module.exports = {
  upload,
  libraryUploadFields
};
