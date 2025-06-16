import User from "../models/User.js";

// @desc   Get all users (role-based)
// @route  GET /api/users/
// @access Admin only (permit("Admin"))
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Assign Teacher to Student
// @route  PUT /api/users/student/:studentId/assign-teacher/:teacherId
// @access Admin or Teacher (permit("Admin", "Teacher"))
export const assignTeacher = async (req, res) => {
  const { studentId, teacherId } = req.params;
  try {
    const student = await User.findById(studentId);
    const teacher = await User.findById(teacherId);

    if (!student || student.role !== "Student")
      return res.status(404).json({ message: "Student not found" });
    if (!teacher || teacher.role !== "Teacher")
      return res.status(404).json({ message: "Teacher not found" });

    student.teacher = teacher._id;
    await student.save();

    res.json({ message: "Teacher assigned to student" });
  } catch (err) {
    console.error("Assign Teacher Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Assign Parent to Student
// @route  PUT /api/users/parent/:parentId/assign-student/:studentId
// @access Admin or Parent (permit("Admin", "Parent"))
export const assignStudentToParent = async (req, res) => {
  const { parentId, studentId } = req.params;
  try {
    const parent = await User.findById(parentId);
    const student = await User.findById(studentId);

    if (!parent || parent.role !== "Parent")
      return res.status(404).json({ message: "Parent not found" });
    if (!student || student.role !== "Student")
      return res.status(404).json({ message: "Student not found" });

    parent.student = student._id;
    await parent.save();

    res.json({ message: "Student assigned to parent" });
  } catch (err) {
    console.error("Assign Student to Parent Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Get profiles with relations (e.g., Student with Teacher info)
// @route  GET /api/users/student/:studentId
// @access Logged-in user (protect) – but you can restrict so ki sirf Student khud ya uska Teacher/Parent dekh sake
export const getStudentProfile = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await User.findById(studentId)
      .select("-password")
      .populate("teacher", "name email")    // populate Teacher ka name,email
      .populate({
        path: "parent",
        select: "name email",
      }); // agar parent field add kiya hai model me

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Delete a user by ID
// @route  DELETE /api/users/:userId
// @access Admin only
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne(); // or user.remove() if using Mongoose < 6

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Get all Parents
// @route  GET /api/users/parents
// @access Admin or Teacher
export const getAllParents = async (req, res) => {
  try {
    const parents = await User.find({ role: "Parent" }).select("-password");
    res.json(parents);
  } catch (err) {
    console.error("Fetch Parents Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Get all Students
// @route  GET /api/users/students
// @access Admin, Teacher, or Parent
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    res.json(students);
  } catch (err) {
    console.error("Fetch Students Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Get all Teachers
// @route  GET /api/users/teachers
// @access Admin or Teacher
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" }).select("-password");
    res.json(teachers);
  } catch (err) {
    console.error("Fetch Teachers Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Get Parent Profile
// @route  GET /api/users/parent/:parentId
// @access Admin, Teacher, or Parent
export const getParentProfile = async (req, res) => {
  const { parentId } = req.params;
  try {
    const parent = await User.findById(parentId)
      .select("-password")
      .populate({
        path: "children",
        select: "name email role",
      });

    if (!parent || parent.role !== "Parent") {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.json(parent);
  } catch (err) {
    console.error("Get Parent Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Get Teacher Profile
// @route  GET /api/users/teacher/:teacherId
// @access Admin or Teacher
export const getTeacherProfile = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await User.findById(teacherId)
      .select("-password")
      .populate({
        path: "students",
        select: "name email role",
      });

    if (!teacher || teacher.role !== "Teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (err) {
    console.error("Get Teacher Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// @desc   Update user profile (by Admin or user themselves)
// @route  PUT /api/users/:userId
// @access Admin or Self
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, role } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update provided fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (role && req.user.role === "Admin") user.role = role; // only admin can change roles

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Update User Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
