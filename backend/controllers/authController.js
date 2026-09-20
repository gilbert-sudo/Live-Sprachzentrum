const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../utils/encryption');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user or student
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, paymentType, level, phone, gender, birthday, photo } = req.body;

    const userExists = await User.findOne({ email });
    const studentExists = await Student.findOne({ email });
    
    if (userExists || studentExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // ALWAYS force student creation on this public endpoint
    const user = await Student.create({
      name,
      email,
      password,
      encryptedPassword: encrypt(password),
      role: 'student',
      status: 'pending',
      level: level || 'A1',
      phone,
      gender,
      birthday,
      photo,
      subscription: { paymentType: paymentType || 'full', firstPaymentPaid: false, secondPaymentPaid: false }
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        level: user.level,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await Student.findOne({ email });
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        level: user.level,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user._id).select('-password');
    if (!user) {
      user = await Student.findById(req.user._id).select('-password');
    }
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Check if email exists
// @route   GET /api/auth/check-email
// @access  Public
const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const userExists = await User.findOne({ email });
    const studentExists = await Student.findOne({ email });
    
    if (userExists || studentExists) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error('Check Email Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  checkEmail,
};
