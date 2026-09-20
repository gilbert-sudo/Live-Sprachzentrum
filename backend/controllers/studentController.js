const Student = require('../models/Student');
const { encrypt, decrypt } = require('../utils/encryption');
const storageService = require('../services/storageService');

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Teacher
const getStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select('-password');
    const studentsWithPasswords = students.map(s => {
      const studentObj = s.toObject();
      if (studentObj.encryptedPassword) {
        studentObj.plainPassword = decrypt(studentObj.encryptedPassword);
      }
      return studentObj;
    });
    res.json(studentsWithPasswords);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private/Teacher
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (student) {
      const studentObj = student.toObject();
      if (studentObj.encryptedPassword) {
        studentObj.plainPassword = decrypt(studentObj.encryptedPassword);
      }
      res.json(studentObj);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update student (including subscription)
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (student) {
      const updatableFields = ['name', 'email', 'level', 'phone', 'gender', 'birthday', 'photo', 'status'];
      
      updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
          if (field === 'birthday' && req.body[field] === '') {
            student[field] = null;
          } else {
            student[field] = req.body[field];
          }
        }
      });

      if (req.body.password && req.body.password.trim() !== '') {
        student.password = req.body.password;
        student.encryptedPassword = encrypt(req.body.password);
      }

      if (req.body.subscription) {
        const currentSubscription = student.subscription 
          ? (typeof student.subscription.toObject === 'function' ? student.subscription.toObject() : student.subscription)
          : {};
          
        student.subscription = {
          ...currentSubscription,
          ...req.body.subscription,
        };
      }

      const updatedStudent = await student.save();
      const studentResponse = {
        _id: updatedStudent._id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        role: updatedStudent.role,
        status: updatedStudent.status,
        level: updatedStudent.level,
        phone: updatedStudent.phone,
        gender: updatedStudent.gender,
        birthday: updatedStudent.birthday,
        photo: updatedStudent.photo,
        subscription: updatedStudent.subscription,
      };
      if (updatedStudent.encryptedPassword) {
        studentResponse.plainPassword = decrypt(updatedStudent.encryptedPassword);
      }
      res.json(studentResponse);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      if (student.photo) {
        await storageService.deleteFile(student.photo);
      }
      await Student.deleteOne({ _id: student._id });
      res.json({ message: 'Student removed' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create student (Admin only)
// @route   POST /api/students
// @access  Private/Admin
const createStudent = async (req, res) => {
  try {
    const { name, email, password, level, phone, gender, birthday, photo, subscription, status } = req.body;

    const studentExists = await Student.findOne({ email });
    const userExists = await require('../models/User').findOne({ email }); // email must be unique across both collections
    if (studentExists || userExists) {
      return res.status(400).json({ message: 'User or Student already exists with this email' });
    }

    const student = await Student.create({
      name,
      email,
      password,
      encryptedPassword: encrypt(password),
      role: 'student',
      status: status || 'active',
      level: level || 'A1',
      phone,
      gender,
      birthday,
      photo,
      subscription: subscription || { paymentType: 'full', firstPaymentPaid: false, secondPaymentPaid: false }
    });

    if (student) {
      const studentResponse = {
        _id: student._id,
        name: student.name,
        email: student.email,
        role: student.role,
        status: student.status,
        level: student.level,
        phone: student.phone,
        gender: student.gender,
        birthday: student.birthday,
        photo: student.photo,
        subscription: student.subscription,
      };
      if (student.encryptedPassword) {
        studentResponse.plainPassword = decrypt(student.encryptedPassword);
      }
      res.status(201).json(studentResponse);
    } else {
      res.status(400).json({ message: 'Invalid student data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  createStudent,
};
