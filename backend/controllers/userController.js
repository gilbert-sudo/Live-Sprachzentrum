const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/encryption');
const storageService = require('../services/storageService');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Teacher
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 }).select('-password');
    const usersWithPasswords = users.map(u => {
      const userObj = u.toObject();
      if (userObj.encryptedPassword) {
        userObj.plainPassword = decrypt(userObj.encryptedPassword);
      }
      return userObj;
    });
    res.json(usersWithPasswords);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Teacher
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      const userObj = user.toObject();
      if (userObj.encryptedPassword) {
        userObj.plainPassword = decrypt(userObj.encryptedPassword);
      }
      res.json(userObj);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Teacher
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const updatableFields = ['name', 'email', 'role', 'level', 'phone', 'gender', 'birthday', 'photo'];
      
      updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
          if (field === 'birthday' && req.body[field] === '') {
            user[field] = null;
          } else {
            user[field] = req.body[field];
          }
        }
      });

      if (req.body.password && req.body.password.trim() !== '') {
        user.password = req.body.password;
        user.encryptedPassword = encrypt(req.body.password);
      }

      const updatedUser = await user.save();
      const userResponse = {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        level: updatedUser.level,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        birthday: updatedUser.birthday,
        photo: updatedUser.photo,
      };
      if (updatedUser.encryptedPassword) {
        userResponse.plainPassword = decrypt(updatedUser.encryptedPassword);
      }
      res.json(userResponse);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Teacher
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.photo) {
        await storageService.deleteFile(user.photo);
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create user (Admin only)
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, level, phone, gender, birthday, photo } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      encryptedPassword: encrypt(password),
      role: role || 'teacher',
      level: level || 'A1',
      phone,
      gender,
      birthday,
      photo,
    });

    if (user) {
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        level: user.level,
        phone: user.phone,
        gender: user.gender,
        birthday: user.birthday,
        photo: user.photo,
      };
      if (user.encryptedPassword) {
        userResponse.plainPassword = decrypt(user.encryptedPassword);
      }
      res.status(201).json(userResponse);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
