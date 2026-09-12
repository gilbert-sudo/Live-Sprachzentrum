const LibraryItem = require('../models/LibraryItem');
const storageService = require('../services/storageService');

exports.createLibraryItem = async (req, res) => {
  try {
    const { title, author, description, type, level, duration, fileUrl: clientFileUrl, coverUrl: clientCoverUrl, linkedBook, audios } = req.body;

    let mediaFileUrl = clientFileUrl;
    let coverFile = null;

    if (req.files) {
      if (req.files.cover) coverFile = req.files.cover[0];
      if (req.files.file && !mediaFileUrl && type !== 'album') {
        mediaFileUrl = await storageService.uploadFile(req.files.file[0], 'Library/Media');
      }
    }

    if (!mediaFileUrl && type !== 'album') {
      return res.status(400).json({ message: 'Media file is required.' });
    }
    
    if (type === 'album' && (!audios || audios.length === 0)) {
      return res.status(400).json({ message: 'At least one audio file is required for an album.' });
    }

    // Upload to Cloudinary / UploadThing for cover
    let coverUrl = clientCoverUrl || (type === 'audio' || type === 'album'
      ? 'https://placehold.co/400x400/e8e8e8/333333?text=' + (type === 'album' ? 'Album' : 'Audio')
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
      fileUrl: type !== 'album' ? mediaFileUrl : undefined,
      linkedBook: type === 'album' ? linkedBook : undefined,
      audios: type === 'album' ? audios : undefined,
      uploadedBy: req.user ? req.user._id : undefined
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

    // Delete files from storage
    if (item.coverUrl) await storageService.deleteFile(item.coverUrl);
    if (item.fileUrl) await storageService.deleteFile(item.fileUrl);
    
    // Delete album audios
    if (item.type === 'album' && item.audios && item.audios.length > 0) {
      for (const audio of item.audios) {
        if (audio.fileUrl) {
          await storageService.deleteFile(audio.fileUrl);
        }
      }
    }

    // Delete from database
    await item.deleteOne();

    res.status(200).json({ message: 'Library item deleted successfully' });
  } catch (error) {
    console.error('Error deleting library item:', error);
    res.status(500).json({ message: 'Failed to delete library item' });
  }
};

exports.updateLibraryItem = async (req, res) => {
  try {
    const { title, author, description, level, duration, linkedBook, coverUrl } = req.body;
    
    const item = await LibraryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Library item not found' });
    }

    if (title) item.title = title;
    if (author) item.author = author;
    if (description !== undefined) item.description = description;
    if (level) item.level = level;
    if (duration !== undefined) item.duration = duration;
    
    if (linkedBook !== undefined) {
      item.linkedBook = linkedBook === '' ? null : linkedBook;
    }
    
    if (coverUrl) {
      item.coverUrl = coverUrl;
    }

    await item.save();
    res.status(200).json(item);
  } catch (error) {
    console.error('Error updating library item:', error);
    res.status(500).json({ message: 'Failed to update library item', error: error.message });
  }
};
