const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const connectDB = require('../config/db');
const Student = require('../models/Student');

const migrateBadges = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    // Find all students without a badgeNumber
    const students = await Student.find({ badgeNumber: { $exists: false } });
    console.log(`Found ${students.length} students without a badge number.`);

    let updatedCount = 0;
    for (const student of students) {
      // Calling save() will trigger the pre-save hook which generates the badge number
      await student.save();
      console.log(`Generated badge ${student.badgeNumber} for student ${student.email}`);
      updatedCount++;
    }

    // Also check for students where badgeNumber is null (just in case)
    const studentsWithNull = await Student.find({ badgeNumber: null });
    console.log(`Found ${studentsWithNull.length} students with null badge number.`);
    for (const student of studentsWithNull) {
      await student.save();
      console.log(`Generated badge ${student.badgeNumber} for student ${student.email}`);
      updatedCount++;
    }

    console.log(`\nMigration complete. Updated ${updatedCount} students.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateBadges();
