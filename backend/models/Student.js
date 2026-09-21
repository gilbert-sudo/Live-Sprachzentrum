const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const subscriptionSchema = new mongoose.Schema({
  paymentType: {
    type: String,
    enum: ['full', 'twice'],
    default: 'full',
  },
  firstPaymentPaid: {
    type: Boolean,
    default: false,
  },
  secondPaymentPaid: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
  },
  role: {
    type: String,
    default: 'student',
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'rejected'],
    default: 'pending',
  },
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Alle'],
    default: 'A1',
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  birthday: {
    type: Date,
  },
  photo: {
    type: String,
  },
  subscription: {
    type: subscriptionSchema,
    default: () => ({}),
  },
  badgeNumber: {
    type: String,
    unique: true,
  }
}, {
  timestamps: true,
});

// Generate badgeNumber and Hash password before saving
studentSchema.pre('save', async function() {
  if (!this.badgeNumber) {
    let exists = true;
    while (exists) {
      const badge = Math.floor(10000 + Math.random() * 90000).toString();
      const existing = await mongoose.models.Student.findOne({ badgeNumber: badge });
      if (!existing) {
        this.badgeNumber = badge;
        exists = false;
      }
    }
  }

  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
studentSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
