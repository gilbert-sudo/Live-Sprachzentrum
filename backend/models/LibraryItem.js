const mongoose = require('mongoose');

const libraryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['book', 'audio'],
    required: true
  },
  level: {
    type: String,
    required: true,
    trim: true // e.g. A1, A2, B1, etc.
  },
  coverUrl: {
    type: String,
    required: true // URL to Cloudinary
  },
  fileUrl: {
    type: String,
    required: true // URL to PDF or Audio on Cloudinary
  },
  duration: {
    type: String, // only for audio, e.g. "05:30"
    trim: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LibraryItem', libraryItemSchema);
