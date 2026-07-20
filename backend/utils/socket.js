// backend/utils/socket.js
import { Server } from 'socket.io';

let io;

export const initIO = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // Live Chat events
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on('send_message', (data) => {
      // Broadcast to everyone in the room
      io.to(data.room).emit('receive_message', {
        ...data,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('admin_typing', (data) => {
      socket.to(data.room).emit('admin_typing', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};
