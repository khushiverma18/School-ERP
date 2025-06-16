import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";
import { createRoom, getRooms, postMessage, getMessages } from "../controllers/chatController.js";
const router = express.Router();

// Teachers and Students can create/join class groups
// Update permissions to include all roles
router.post("/rooms", protect, permit("Admin", "Teacher", "Student", "Parent"), createRoom);
router.get("/rooms", protect, permit("Admin", "Teacher", "Student", "Parent"), getRooms);
router.post("/rooms/message", protect, permit("Admin", "Teacher", "Student", "Parent"), postMessage);
router.get("/rooms/:roomId/messages", protect, permit("Admin", "Teacher", "Student", "Parent"), getMessages);

export default router;