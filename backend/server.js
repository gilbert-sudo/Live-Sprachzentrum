const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: '*', // For development, allow all
    methods: ['GET', 'POST']
  }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/live-sprachzentrum')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);

// Socket.io logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (roomId, userRole) => {
    socket.join(roomId);
    console.log(`User ${socket.id} (${userRole}) joined room ${roomId}`);
    socket.to(roomId).emit('user_joined', { id: socket.id, role: userRole });
  });

  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room ${roomId}`);
    socket.to(roomId).emit('user_left', socket.id);
  });

  // Teacher specific actions
  socket.on('play_audio', ({ roomId, audioUrl }) => {
    // Broadcast to everyone in the room except the sender
    socket.to(roomId).emit('audio_play', { audioUrl });
  });

  socket.on('pause_audio', ({ roomId }) => {
    socket.to(roomId).emit('audio_pause');
  });

  socket.on('sync_audio_time', ({ roomId, currentTime }) => {
    socket.to(roomId).emit('audio_sync', { currentTime });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
