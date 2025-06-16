import express from "express";
import {
  getAllUsers,
  getAllTeachers,
  getAllStudents,
  getAllParents,
  assignTeacher,
  assignStudentToParent,
  getStudentProfile,
  getTeacherProfile,
  getParentProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin operations
router.get("/", protect, permit("Admin"), getAllUsers);
router.get("/teachers", protect, permit("Admin", "Teacher"), getAllTeachers);
router.get("/students", protect, permit("Admin", "Teacher", "Parent"), getAllStudents);
router.get("/parents", protect, permit("Admin", "Teacher"), getAllParents);

// Assign relations
router.put(
  "/student/:studentId/assign-teacher/:teacherId",
  protect,
  permit("Admin", "Teacher"),
  assignTeacher
);
router.put(
  "/parent/:parentId/assign-student/:studentId",
  protect,
  permit("Admin", "Parent"),
  assignStudentToParent
);

// Profile routes
router.get(
  "/student/:studentId",
  protect,
  permit("Admin", "Teacher", "Parent", "Student"),
  getStudentProfile
);
router.get(
  "/teacher/:teacherId",
  protect,
  permit("Admin", "Teacher"),
  getTeacherProfile
);
router.get(
  "/parent/:parentId",
  protect,
  permit("Admin", "Teacher", "Parent"),
  getParentProfile
);

// Update & Delete (Admin or self)
router.put(
  "/:userId",
  protect,
  // allow Admin or the user themselves
  (req, res, next) => {
    if (req.user.role === "Admin" || req.user._id.toString() === req.params.userId) {
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  },
  updateUser
);
router.delete(
  "/:userId",
  protect,
  permit("Admin"),
  deleteUser
);

export default router;
