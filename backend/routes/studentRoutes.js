const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  createStudent,
} = require('../controllers/studentController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, teacher, getStudents)
  .post(protect, admin, createStudent);

router.route('/:id')
  .get(protect, teacher, getStudentById)
  .put(protect, admin, updateStudent)
  .delete(protect, admin, deleteStudent);

module.exports = router;
