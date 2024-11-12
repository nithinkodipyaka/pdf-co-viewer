// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files in the 'public' folder
app.use(express.static('public'));

// Variable to keep track of the current page number
let currentPage = 1;

// Handle client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current page to a new user
  socket.emit('pageUpdate', currentPage);

  // Listen for page changes from the admin
  socket.on('pageChange', (page) => {
    currentPage = page;        // Update current page
    io.emit('pageUpdate', page); // Send new page to all users
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
