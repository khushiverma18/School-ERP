// controllers/authController.js
import bcrypt from "bcryptjs";
import User, { rolesEnum } from "../models/User.js";
import createToken from "../utils/createToken.js";

// User Registration
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!rolesEnum.includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  try {
    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return user data with token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: createToken(user),
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// User Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Successful login response
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: createToken(user),
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};