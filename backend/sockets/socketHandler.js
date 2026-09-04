const Classroom = require('../models/Classroom');

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (roomId, userRole) => {
      socket.join(roomId);
      socket.roomId = roomId;
      socket.userRole = userRole;
      console.log(`User ${socket.id} (${userRole}) joined room ${roomId}`);
      socket.to(roomId).emit('user_joined', { id: socket.id, role: userRole });
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
      socket.to(roomId).emit('user_left', socket.id);
    });

    socket.on('sneak_leave', () => {
      socket.isSneakLeave = true;
      console.log(`User ${socket.id} is doing a sneak leave.`);
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

    socket.on('homework_updated', ({ roomId }) => {
      socket.to(roomId).emit('homework_updated');
    });

    socket.on('disconnect', async () => {
      console.log('User disconnected:', socket.id);
      
      // Auto-close classroom if teacher disconnects AND it wasn't a sneak leave
      if ((socket.userRole === 'teacher' || socket.userRole === 'admin') && !socket.isSneakLeave) {
        if (socket.roomId) {
          try {
            const classroom = await Classroom.findOne({ roomId: socket.roomId });
            if (classroom && classroom.isLive) {
              classroom.isLive = false;
              await classroom.save();
              console.log(`Classroom ${socket.roomId} marked as not live due to teacher disconnect.`);
            }
          } catch (err) {
            console.error('Error auto-closing classroom on disconnect:', err);
          }
        }
      }
    });
  });
};

module.exports = socketHandler;
