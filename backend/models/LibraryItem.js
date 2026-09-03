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
    enum: ['book', 'audio', 'album'],
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
    required: false // URL to PDF or single Audio on Cloudinary. Optional now because albums have multiple audios
  },
  duration: {
    type: String, // only for audio, e.g. "05:30"
    trim: true
  },
  linkedBook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LibraryItem' // Optional reference to a book
  },
  audios: [{
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    duration: { type: String, trim: true },
    originalName: { type: String }
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LibraryItem', libraryItemSchema);
