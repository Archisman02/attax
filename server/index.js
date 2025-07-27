const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // or your Next.js domain
    methods: ["GET", "POST"],
  },
});
app.use(cors());

const rooms = {}; // In-memory store

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create-room", () => {
    console.log("Creating room for:", socket.id);
    const roomCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    rooms[roomCode] = {
      players: [socket.id],
      scores: {},
    };
    socket.join(roomCode);
    console.log("Room created:", roomCode);
    socket.emit("room-created", roomCode);
  });

  socket.on("join-room", ({ roomCode }) => {
    const room = rooms[roomCode];
    if (!room || room.players.length >= 2) {
      socket.emit("join-error", "Room not available");
      return;
    }

    room.players.push(socket.id);
    socket.join(roomCode);
    io.to(roomCode).emit("room-joined", { players: room.players });

    // Start game if 2 players are present
    if (room.players.length === 2) {
      const questions = generateQuestions(); // create 10 Qs
      io.to(roomCode).emit("start-quiz", questions);
    }
  });

  socket.on("submit-answer", ({ roomCode, playerId, correct }) => {
    const room = rooms[roomCode];
    if (!room) return;

    room.scores[playerId] = (room.scores[playerId] || 0) + (correct ? 1 : 0);

    // Optional: check if all answers are in and then send result
    if (Object.keys(room.scores).length === 2) {
      io.to(roomCode).emit("quiz-result", room.scores);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Clean up from rooms
    for (const [code, room] of Object.entries(rooms)) {
      if (room.players.includes(socket.id)) {
        delete rooms[code];
        io.to(code).emit("player-disconnected");
      }
    }
  });
});

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
