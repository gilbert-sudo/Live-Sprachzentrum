const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/userController');
const { protect, teacher, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, teacher, getUsers)
  .post(protect, admin, createUser);

router.route('/:id')
  .get(protect, teacher, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
