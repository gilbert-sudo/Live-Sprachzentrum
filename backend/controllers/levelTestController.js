const LevelTestResult = require('../models/LevelTestResult');
const Student = require('../models/Student');

/**
 * @desc    Submit level test result
 * @route   POST /api/level-tests/submit
 * @access  Public / Optional Auth
 */
const submitLevelTest = async (req, res) => {
  try {
    const {
      testId,
      targetLevel,
      prerequisiteLevel,
      percentage,
      totalPoints,
      maxPoints,
      recommendedLevel,
      badge,
      timedOut,
      durationSeconds,
      answers,
      correctCount,
      partialCount,
      wrongCount,
      firstName,
      lastName,
      email,
      guestSessionId
    } = req.body;

    if (!testId || percentage === undefined || totalPoints === undefined || maxPoints === undefined) {
      return res.status(400).json({ message: 'Erforderliche Testdaten fehlen.' });
    }

    let userId = null;
    let userModel = 'Student';
    let userName = '';
    let userEmail = '';

    if (req.user) {
      userId = req.user._id;
      userModel = req.user.role === 'student' ? 'Student' : 'User';
      userEmail = req.user.email || '';
      userName = req.user.name || [firstName, lastName].filter(Boolean).join(' ') || 'Schüler';
    } else {
      userName = [firstName, lastName].filter(Boolean).join(' ') || 'Gast';
      userEmail = email || '';
    }

    const testResult = new LevelTestResult({
      user: userId,
      userModel,
      userName,
      userEmail,
      guestSessionId: guestSessionId || null,
      testId: testId.toLowerCase(),
      targetLevel: targetLevel || testId.toUpperCase(),
      prerequisiteLevel: prerequisiteLevel || '',
      percentage: Number(percentage),
      totalPoints: Number(totalPoints),
      maxPoints: Number(maxPoints),
      recommendedLevel: recommendedLevel || '',
      badge: badge || '',
      timedOut: Boolean(timedOut),
      durationSeconds: Number(durationSeconds) || 0,
      correctCount: Number(correctCount) || 0,
      partialCount: Number(partialCount) || 0,
      wrongCount: Number(wrongCount) || 0,
      answers: answers || {},
      completedAt: new Date()
    });

    const saved = await testResult.save();

    // If logged-in user is a student, and score indicates proficiency at or above target level
    if (req.user && req.user.role === 'student' && percentage >= 70) {
      try {
        const student = await Student.findById(req.user._id);
        if (student) {
          // If student was on A1 and passed A2 test, suggest/update to A2
          const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
          const currentIdx = levelsOrder.indexOf(student.level);
          const targetIdx = levelsOrder.indexOf(targetLevel);
          if (targetIdx > currentIdx) {
            student.level = targetLevel;
            await student.save();
          }
        }
      } catch (studentErr) {
        console.error('Error auto-syncing student level:', studentErr);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Testergebnis erfolgreich gespeichert.',
      result: saved
    });
  } catch (error) {
    console.error('Submit Level Test Error:', error);
    res.status(500).json({ message: 'Fehler beim Speichern des Einstufungstests.', error: error.message });
  }
};

/**
 * @desc    Get user's latest level test results & history
 * @route   GET /api/level-tests/my-results
 * @access  Public / Optional Auth
 */
const getMyLevelTests = async (req, res) => {
  try {
    const { guestSessionId } = req.query;
    let query = null;

    if (req.user) {
      query = { user: req.user._id };
    } else if (guestSessionId) {
      query = { guestSessionId };
    }

    if (!query) {
      return res.json({ latest: {}, history: [] });
    }

    const history = await LevelTestResult.find(query).sort({ completedAt: -1 }).lean();

    // Group to extract latest result per testId ('a2', 'b1', 'b2')
    const latest = {};
    history.forEach((resItem) => {
      const tid = resItem.testId?.toLowerCase();
      if (tid && !latest[tid]) {
        latest[tid] = {
          _id: resItem._id,
          testId: resItem.testId,
          targetLevel: resItem.targetLevel,
          prerequisiteLevel: resItem.prerequisiteLevel,
          percentage: resItem.percentage,
          totalPoints: resItem.totalPoints,
          maxPoints: resItem.maxPoints,
          recommendedLevel: resItem.recommendedLevel,
          badge: resItem.badge,
          timedOut: resItem.timedOut,
          durationSeconds: resItem.durationSeconds,
          completedAt: resItem.completedAt
        };
      }
    });

    res.json({ latest, history });
  } catch (error) {
    console.error('Get My Level Tests Error:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Testergebnisse.', error: error.message });
  }
};

/**
 * @desc    Get single level test result by ID
 * @route   GET /api/level-tests/results/:id
 * @access  Public / Optional Auth
 */
const getLevelTestById = async (req, res) => {
  try {
    const result = await LevelTestResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Testergebnis nicht gefunden.' });
    }
    res.json({ success: true, result });
  } catch (error) {
    console.error('Get Level Test By Id Error:', error);
    res.status(500).json({ message: 'Fehler beim Laden des Testergebnisses.', error: error.message });
  }
};

/**
 * @desc    Get all level test submissions (for teachers/admins)
 * @route   GET /api/level-tests
 * @access  Private / Teacher / Admin
 */
const getAllLevelTests = async (req, res) => {
  try {
    const { testId, targetLevel, search } = req.query;
    const query = {};

    if (testId) query.testId = testId.toLowerCase();
    if (targetLevel) query.targetLevel = targetLevel.toUpperCase();
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const results = await LevelTestResult.find(query)
      .sort({ completedAt: -1 })
      .populate('user', 'name email level badgeNumber role')
      .lean();

    res.json(results);
  } catch (error) {
    console.error('Get All Level Tests Error:', error);
    res.status(500).json({ message: 'Fehler beim Laden aller Testergebnisse.', error: error.message });
  }
};

/**
 * @desc    Get level test submissions for a specific student
 * @route   GET /api/level-tests/student/:studentId
 * @access  Private / Teacher / Admin
 */
const getStudentLevelTests = async (req, res) => {
  try {
    const { studentId } = req.params;
    const history = await LevelTestResult.find({ user: studentId }).sort({ completedAt: -1 }).lean();

    const latest = {};
    history.forEach((resItem) => {
      const tid = resItem.testId?.toLowerCase();
      if (tid && !latest[tid]) {
        latest[tid] = resItem;
      }
    });

    res.json({ latest, history });
  } catch (error) {
    console.error('Get Student Level Tests Error:', error);
    res.status(500).json({ message: 'Fehler beim Laden der Schülertestergebnisse.', error: error.message });
  }
};

/**
 * @desc    Delete a level test result
 * @route   DELETE /api/level-tests/results/:id
 * @access  Private / Admin
 */
const deleteLevelTest = async (req, res) => {
  try {
    const result = await LevelTestResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Testergebnis nicht gefunden.' });
    }
    await result.deleteOne();
    res.json({ success: true, message: 'Testergebnis gelöscht.' });
  } catch (error) {
    console.error('Delete Level Test Error:', error);
    res.status(500).json({ message: 'Fehler beim Löschen des Testergebnisses.', error: error.message });
  }
};

module.exports = {
  submitLevelTest,
  getMyLevelTests,
  getLevelTestById,
  getAllLevelTests,
  getStudentLevelTests,
  deleteLevelTest
};

