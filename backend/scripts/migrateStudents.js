require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');

const migrateStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Migration');

    // Find all users with role 'student' (bypassing enum check if any by using strict: false or just normal find since it's already in DB)
    const studentsInUsers = await User.find({ role: 'student' });
    console.log(`Found ${studentsInUsers.length} students to migrate`);

    let migrated = 0;
    for (const u of studentsInUsers) {
      // Check if student already migrated
      const existingStudent = await Student.findOne({ email: u.email });
      if (!existingStudent) {
        await Student.create({
          _id: u._id,
          name: u.name,
          email: u.email,
          password: u.password, // already hashed
          encryptedPassword: u.encryptedPassword,
          role: u.role,
          level: u.level,
          phone: u.phone,
          gender: u.gender,
          birthday: u.birthday,
          photo: u.photo,
          createdAt: u.createdAt,
          updatedAt: u.updatedAt
        });
        migrated++;
      }
    }
    console.log(`Successfully migrated ${migrated} students.`);

    // Delete migrated students from Users collection
    if (migrated > 0 || studentsInUsers.length > 0) {
      await User.deleteMany({ role: 'student' });
      console.log('Deleted students from User collection.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateStudents();
