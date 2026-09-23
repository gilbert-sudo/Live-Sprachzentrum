const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date
  },
  roomId: {
    type: String, // Can be bound to a specific classroom
    default: null
  },
  level: {
    type: String, // Can be bound to a level (A1, A2, etc.)
    default: null
  },
  teacherName: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  exercises: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  scores: {
    type: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        studentName: { type: String },
        score: { type: Number },          // correct answers
        total: { type: Number },          // total questions
        percentage: { type: Number },     // 0-100
        answers: { type: [mongoose.Schema.Types.Mixed] },
        completedAt: { type: Date, default: Date.now }
      }
    ],
    default: []
  }
});

module.exports = mongoose.model('Homework', homeworkSchema);
