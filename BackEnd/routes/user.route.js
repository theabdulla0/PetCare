const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
