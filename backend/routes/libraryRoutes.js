const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { libraryUploadFields } = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all library items
router.get('/', libraryController.getLibraryItems);

// Create a new library item (Admin only)
router.post('/', protect, admin, libraryUploadFields, libraryController.createLibraryItem);

// Delete a library item
router.delete('/:id', protect, admin, libraryController.deleteLibraryItem);

// Update a library item
router.put('/:id', protect, admin, libraryUploadFields, libraryController.updateLibraryItem);

module.exports = router;
