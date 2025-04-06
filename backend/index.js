const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

const rooms = {}; // { roomId: [player1, player2] }

wss.on("connection", (ws) => {
  console.log("🟢 New client connected");

  ws.on("message", (message) => {
    try {
      console.log("📩 Message received:", message);
      const data = JSON.parse(message);

      switch (data.type) {
        case "CREATE_ROOM":
          const roomId = uuidv4();
          rooms[roomId] = [ws];
          ws.roomId = roomId;

          console.log(`🏠 Room created: ${roomId}`);
          ws.send(JSON.stringify({ type: "ROOM_CREATED", roomId }));
          break;

        case "JOIN_ROOM":
          const room = rooms[data.roomId];

          if (room && room.length === 1) {
            room.push(ws);
            ws.roomId = data.roomId;

            console.log(`🙋‍♂️ Player joined room: ${data.roomId}`);
            room.forEach((client) =>
              client.send(
                JSON.stringify({ type: "GAME_START", roomId: data.roomId })
              )
            );
          } else {
            ws.send(
              JSON.stringify({
                type: "ERROR",
                message: "Room is full or doesn't exist.",
              })
            );
          }
          break;

        default:
          console.log("⚠️ Unknown message type:", data.type);
      }
    } catch (err) {
      console.error("❌ Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    const roomId = ws.roomId;
    if (roomId && rooms[roomId]) {
      // Remove disconnected user from room
      rooms[roomId] = rooms[roomId].filter((client) => client !== ws);

      // Clean up empty room
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
        console.log(`🧹 Room ${roomId} deleted`);
      }
    }

    console.log("🔴 Client disconnected");
  });
});

console.log(`🚀 WebSocket server running on ws://localhost:${PORT}`);
