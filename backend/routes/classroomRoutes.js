const express = require('express');
const router = express.Router();
const { protect, teacher } = require('../middleware/authMiddleware');
const {
  getClassrooms,
  createClassroom,
  updateClassroomStatus
} = require('../controllers/classroomController');

// Get all classrooms
router.route('/').get(getClassrooms);

// Create a new classroom
router.route('/').post(protect, teacher, createClassroom);

// Update classroom live status by roomId
router.route('/room/:roomId/status').patch(protect, teacher, updateClassroomStatus);

module.exports = router;
