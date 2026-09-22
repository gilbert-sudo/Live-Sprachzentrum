const Homework = require('../models/Homework');

// @desc    Get homeworks for a specific room or level
// @route   GET /api/homework
// @access  Private
const getHomeworks = async (req, res) => {
  try {
    const { roomId, level, isPinned } = req.query;
    
    // Build query based on provided params
    let query = {};
    const conditions = [];

    if (roomId) conditions.push({ roomId });
    if (level) {
      conditions.push({ level });
      conditions.push({ level: 'Alle' });
      conditions.push({ level: 'Tous' });
    }
    
    if (conditions.length > 0) {
      query = { $or: conditions };
    }

    if (isPinned === 'true') {
      // If fetching only pinned, we intersect with the level/roomId query
      query.isPinned = true;
    }

    const homeworks = await Homework.find(query).sort({ createdAt: -1 });
    res.json(homeworks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create new homework
// @route   POST /api/homework
// @access  Private/Teacher
const createHomework = async (req, res) => {
  const { title, description, dueDate, roomId, level, exercises } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Titre et description sont requis' });
  }

  const homework = new Homework({
    title,
    description,
    dueDate,
    roomId: roomId || null,
    level: level || null,
    exercises: exercises || [],
    teacherName: req.user.name,
    teacherId: req.user._id
  });

  try {
    const newHomework = await homework.save();
    res.status(201).json(newHomework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete homework
// @route   DELETE /api/homework/:id
// @access  Private/Teacher
const deleteHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({ message: 'Devoir non trouvé' });
    }
    
    // Ensure only the teacher who created it or an admin can delete
    if (homework.teacherId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    await homework.deleteOne();
    res.json({ message: 'Devoir supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Toggle pin status for homework
// @route   PATCH /api/homework/:id/pin
// @access  Private/Teacher
const togglePinHomework = async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({ message: 'Devoir non trouvé' });
    }
    
    if (homework.teacherId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    homework.isPinned = !homework.isPinned;
    await homework.save();
    
    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update exercises in a homework
// @route   PUT /api/homework/:id/exercises
// @access  Private/Teacher
const updateHomeworkExercises = async (req, res) => {
  try {
    const { exercises } = req.body;
    const homework = await Homework.findById(req.params.id);
    
    if (!homework) {
      return res.status(404).json({ message: 'Devoir non trouvé' });
    }
    
    // Ensure only the teacher who created it or an admin can edit
    if (homework.teacherId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    homework.exercises = exercises || [];
    await homework.save();
    
    res.json(homework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getHomeworks,
  createHomework,
  deleteHomework,
  togglePinHomework,
  updateHomeworkExercises
};
