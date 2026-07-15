const socketHandler = (io) => {
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
};

module.exports = socketHandler;
