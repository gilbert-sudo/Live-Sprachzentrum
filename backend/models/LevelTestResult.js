const mongoose = require('mongoose');

const levelTestResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'userModel',
      default: null,
      index: true
    },
    userModel: {
      type: String,
      enum: ['Student', 'User'],
      default: 'Student'
    },
    userName: {
      type: String,
      trim: true,
      default: ''
    },
    userEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    guestSessionId: {
      type: String,
      default: null,
      index: true
    },
    testId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    targetLevel: {
      type: String,
      required: true,
      trim: true
    },
    prerequisiteLevel: {
      type: String,
      required: true,
      trim: true
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    totalPoints: {
      type: Number,
      required: true
    },
    maxPoints: {
      type: Number,
      required: true
    },
    recommendedLevel: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    },
    timedOut: {
      type: Boolean,
      default: false
    },
    durationSeconds: {
      type: Number,
      default: 0
    },
    correctCount: {
      type: Number,
      default: 0
    },
    partialCount: {
      type: Number,
      default: 0
    },
    wrongCount: {
      type: Number,
      default: 0
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    completedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for rapid lookup of a user's test records
levelTestResultSchema.index({ user: 1, testId: 1, completedAt: -1 });
levelTestResultSchema.index({ guestSessionId: 1, testId: 1, completedAt: -1 });

const LevelTestResult = mongoose.model('LevelTestResult', levelTestResultSchema);

module.exports = LevelTestResult;

