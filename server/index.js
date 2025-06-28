const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  // ✅ Player wants to join a room
  socket.on("joinRoom", ({ roomId, playerName }) => {
    console.log(`${playerName} (${socket.id}) wants to join ${roomId}`);

    // If room doesn’t exist, create it
    if (!rooms[roomId]) {
      rooms[roomId] = {
        players: [],
        // Add other game-specific state if needed
      };
    }

    // Add this player’s socket ID
    rooms[roomId].players.push({ id: socket.id, name: playerName });

    // Make the socket join the Socket.IO room
    socket.join(roomId);

    // Notify others in room
    socket.to(roomId).emit("playerJoined", {
      playerId: socket.id,
      playerName,
    });

    // Optionally, send the updated room info to the joining player
    socket.emit("joinedRoom", {
      roomId,
      players: rooms[roomId].players,
    });

    console.log(`Players in ${roomId}:`, rooms[roomId].players);
  });

  // ✅ Handle disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    // Remove from any rooms
    for (const roomId in rooms) {
      rooms[roomId].players = rooms[roomId].players.filter(
        (p) => p.id !== socket.id
      );

      // Optionally: Notify remaining players
      socket.to(roomId).emit("playerLeft", { playerId: socket.id });

      // If room is empty, delete it
      if (rooms[roomId].players.length === 0) {
        delete rooms[roomId];
      }
    }
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
