const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
require("dotenv").config();

const problemsRoutes = require("./routes/problems");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

const PORT = 8080;
const rooms = {}; // Stores room details

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/problems", problemsRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Function to generate a random room code
const generateRoomCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase(); // 6-char code
};

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Create Room
  socket.on("createRoom", (username) => {
    const roomCode = generateRoomCode();
    rooms[roomCode] = { users: [], questions: [], progress: {} };

    rooms[roomCode].users.push({ id: socket.id, username });
    rooms[roomCode].progress[socket.id] = { solved: 0, startTime: Date.now() };

    socket.join(roomCode);
    console.log(`${username} created room: ${roomCode}`);

    socket.emit("roomCreated", roomCode);
    io.to(roomCode).emit("roomUpdate", { users: rooms[roomCode].users });
  });

  // Join Room
  socket.on("joinRoom", ({ username, roomCode }) => {
    if (!rooms[roomCode]) {
      socket.emit("error", "Room not found!");
      return;
    }

    rooms[roomCode].users.push({ id: socket.id, username });
    rooms[roomCode].progress[socket.id] = { solved: 0, startTime: Date.now() };

    socket.join(roomCode);
    console.log(`${username} joined room: ${roomCode}`);

    io.to(roomCode).emit("roomUpdate", { users: rooms[roomCode].users });
  });

  // Start Competition
  socket.on("startCompetition", (roomCode) => {
    if (!rooms[roomCode]) {
      socket.emit("error", "Room not found!");
      return;
    }

    console.log(`Competition started for room: ${roomCode}`);

    // Emit to all users in the room
    io.to(roomCode).emit("competitionStarted", roomCode);
  });

  // Handle Disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    for (const roomCode in rooms) {
      rooms[roomCode].users = rooms[roomCode].users.filter(
        (user) => user.id !== socket.id
      );
      delete rooms[roomCode].progress[socket.id];
      io.to(roomCode).emit("roomUpdate", { users: rooms[roomCode].users });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
