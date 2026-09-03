const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const connectDB = require('./config/db');
const socketHandler = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);

const path = require('path');
const { createRouteHandler } = require('uploadthing/express');
const { uploadRouter } = require('./uploadthingRouter');

app.use(cors());

// UploadThing route MUST be before express.json() - the raw body is needed
// for HMAC signature verification on dev-stream callbacks
app.use('/api/uploadthing', createRouteHandler({
  router: uploadRouter
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
connectDB();

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: '*', // For development, allow all
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  }
});

// Socket.io logic
socketHandler(io);

// Routes
const authRoutes = require('./routes/authRoutes');
const classroomRoutes = require('./routes/classroomRoutes');
const userRoutes = require('./routes/userRoutes');
const jitsiRoutes = require('./routes/jitsiRoutes');
const libraryRoutes = require('./routes/libraryRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jitsi', jitsiRoutes);
app.use('/api/library', libraryRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
