const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { libraryUploadFields } = require('../middleware/uploadMiddleware');
// const { protect, authorize } = require('../middleware/authMiddleware'); // assuming these exist

// Get all library items
router.get('/', libraryController.getLibraryItems);

// Create a new library item (Teacher/Admin only ideally, but we'll leave it open for now or protect if auth middleware is ready)
// You should add 'protect, authorize("teacher", "admin")' here in production
router.post('/', libraryUploadFields, libraryController.createLibraryItem);

// Delete a library item
router.delete('/:id', libraryController.deleteLibraryItem);

module.exports = router;
