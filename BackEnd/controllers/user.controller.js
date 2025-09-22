const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    return res.status(201).json({
      success: true,
      message: "User Created",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(404).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(404).json({ message: "Password is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    return res.status(201).json({
      success: true,
      message: "User Login",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `http://localhost:${process.env.PORT}/api/user/reset-password?token=${token}`;
    const message = `
      <h2>Password Reset Request</h2>
      <p>Hello ${user.name},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}" target="_blank">${resetLink}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;
    await sendMail({
      to: email,
      subject: "Password Reset - Pet Care App",
      html: message,
    });
    res.json({ message: "Password reset mail sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Email could not be sent", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const { newPassword } = req.body;

    if (!token) return res.status(400).json({ message: "Token is required" });
    if (!newPassword)
      return res.status(400).json({ message: "New password is required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Reset failed", error: error.message });
  }
};





module.exports = {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
