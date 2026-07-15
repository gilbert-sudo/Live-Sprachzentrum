const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, teacher } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, teacher, getUsers);

router.route('/:id')
  .get(protect, teacher, getUserById)
  .put(protect, teacher, updateUser)
  .delete(protect, teacher, deleteUser);

module.exports = router;
