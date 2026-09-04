const express = require('express');
const router = express.Router();
const { protect, teacher } = require('../middleware/authMiddleware');
const {
  getHomeworks,
  createHomework,
  deleteHomework,
  togglePinHomework
} = require('../controllers/homeworkController');

// @route   GET /api/homework
// @desc    Get homeworks
// @access  Private
router.route('/').get(protect, getHomeworks);

// @route   POST /api/homework
// @desc    Create homework
// @access  Private/Teacher
router.route('/').post(protect, teacher, createHomework);

// @route   DELETE /api/homework/:id
// @desc    Delete homework
// @access  Private/Teacher
router.route('/:id').delete(protect, teacher, deleteHomework);

// @route   PATCH /api/homework/:id/pin
// @desc    Toggle pin status for homework
// @access  Private/Teacher
router.route('/:id/pin').patch(protect, teacher, togglePinHomework);

module.exports = router;
