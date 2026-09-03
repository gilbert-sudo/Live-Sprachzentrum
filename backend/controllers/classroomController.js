const Classroom = require('../models/Classroom');

// @desc    Get all classrooms
// @route   GET /api/classrooms
// @access  Public (or protected if needed)
const getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().sort({ createdAt: -1 });
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new classroom
// @route   POST /api/classrooms
// @access  Private/Teacher
const createClassroom = async (req, res) => {
  const classroom = new Classroom({
    name: req.body.name,
    subject: req.body.subject,
    level: req.body.level,
    teacherName: req.body.teacherName,
    isLive: req.body.isLive,
    roomId: req.body.roomId || Math.random().toString(36).substring(2, 10) // generate simple room id
  });

  try {
    const newClassroom = await classroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update classroom live status by roomId (or create if it doesn't exist)
// @route   PATCH /api/classrooms/room/:roomId/status
// @access  Private/Teacher
const updateClassroomStatus = async (req, res) => {
  try {
    let classroom = await Classroom.findOne({ roomId: req.params.roomId });
    
    if (!classroom) {
      // Auto-generate name based on level if not provided
      const defaultNames = {
        'A1': 'Deutsch für Anfänger',
        'A2': 'Grundlagen',
        'B1': 'Mittelstufe',
        'B2': 'Gute Mittelstufe'
      };
      
      const level = req.body.level || (req.params.roomId.split('-')[1] || 'A1');
      const generatedName = defaultNames[level] || 'Live Class';

      classroom = new Classroom({
        roomId: req.params.roomId,
        name: req.body.name || generatedName,
        subject: req.body.subject || level,
        level: level,
        teacherName: req.user ? req.user.name : (req.body.teacherName || 'Lehrer'),
        isLive: req.body.isLive !== undefined ? req.body.isLive : true
      });
    } else {
      if (req.body.isLive !== undefined) {
        classroom.isLive = req.body.isLive;
      }
      if (req.body.isLive && req.user) {
        classroom.teacherName = req.user.name;
      }
    }
    
    const updatedClassroom = await classroom.save();
    res.json(updatedClassroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getClassrooms,
  createClassroom,
  updateClassroomStatus
};
