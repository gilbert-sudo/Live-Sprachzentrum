const LibraryItem = require('../models/LibraryItem');
const storageService = require('../services/storageService');

exports.createLibraryItem = async (req, res) => {
  try {
    const { title, author, description, type, level, duration, fileUrl: clientFileUrl, coverUrl: clientCoverUrl } = req.body;

    let mediaFileUrl = clientFileUrl;
    let coverFile = null;

    if (req.files) {
      if (req.files.cover) coverFile = req.files.cover[0];
      if (req.files.file && !mediaFileUrl) {
        mediaFileUrl = await storageService.uploadFile(req.files.file[0], 'Library/Media');
      }
    }

    if (!mediaFileUrl) {
      return res.status(400).json({ message: 'Media file is required.' });
    }

    // Upload to Cloudinary
    // Upload cover image to Library/Covers if provided, else use default
    let coverUrl = clientCoverUrl || (type === 'audio' 
      ? 'https://placehold.co/400x400/e8e8e8/333333?text=Audio' 
      : 'https://placehold.co/400x600/e8e8e8/333333?text=Buch');
    
    if (coverFile) {
      coverUrl = await storageService.uploadFile(coverFile, 'Library/Covers');
    }

    // Save to database
    const newItem = new LibraryItem({
      title,
      author,
      description,
      type,
      level,
      duration: type === 'audio' ? duration : undefined,
      coverUrl,
      fileUrl: mediaFileUrl,
      uploadedBy: req.user ? req.user._id : undefined // assuming authMiddleware populates req.user
    });

    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating library item:', error);
    res.status(500).json({ message: 'Failed to create library item', error: error.message });
  }
};

exports.getLibraryItems = async (req, res) => {
  try {
    const items = await LibraryItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching library items:', error);
    res.status(500).json({ message: 'Failed to fetch library items' });
  }
};

exports.deleteLibraryItem = async (req, res) => {
  try {
    const item = await LibraryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Library item not found' });
    }

    // Delete files from Cloudinary
    await storageService.deleteFile(item.coverUrl);
    await storageService.deleteFile(item.fileUrl);

    // Delete from database
    await item.deleteOne();

    res.status(200).json({ message: 'Library item deleted successfully' });
  } catch (error) {
    console.error('Error deleting library item:', error);
    res.status(500).json({ message: 'Failed to delete library item' });
  }
};
