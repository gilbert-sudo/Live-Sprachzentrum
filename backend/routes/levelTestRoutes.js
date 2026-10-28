const express = require('express');
const router = express.Router();
const {
  submitLevelTest,
  getMyLevelTests,
  getLevelTestById,
  getAllLevelTests,
  getStudentLevelTests,
  deleteLevelTest
} = require('../controllers/levelTestController');
const { protect, teacher, admin, optionalProtect } = require('../middleware/authMiddleware');

// Public / Optional Auth endpoints (Students & Prospective Guests)
router.post('/submit', optionalProtect, submitLevelTest);
router.get('/my-results', optionalProtect, getMyLevelTests);
router.get('/results/:id', optionalProtect, getLevelTestById);

// Teacher & Admin endpoints
router.get('/student/:studentId', protect, teacher, getStudentLevelTests);
router.get('/', protect, teacher, getAllLevelTests);
router.delete('/results/:id', protect, admin, deleteLevelTest);

module.exports = router;

