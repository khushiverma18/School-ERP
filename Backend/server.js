import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Message from "./models/Message.js";
import ChatRoom from "./models/ChatRoom.js";


dotenv.config();
await connectDB();

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: "*" }
});
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",   // allow your frontend origin
  credentials: true                  // if using cookies or headers like Authorization
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("Authentication error"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.id}`);

  socket.on("joinRoom", async ({ roomId }) => {
    const room = await ChatRoom.findById(roomId);
    if (room && room.participants.includes(socket.user.id)) {
      socket.join(roomId);
    }
  });

  socket.on("sendMessage", async ({ roomId, content }) => {
    // Validate membership
    const room = await ChatRoom.findById(roomId);
    if (!room || !room.participants.includes(socket.user.id)) return;

    // Save message
    const msg = await Message.create({
      room: roomId,
      sender: socket.user.id,
      content
    });
    await msg.populate("sender", "name");

    // Broadcast to room
    io.to(roomId).emit("newMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}`);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));