const db = require("../models/index");
const bcrypt = require("bcryptjs");
const employees = db.employees;
const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;
const authService = require("../services/auth.services");

// Registering the user and storing the dat in the database.
exports.registerEmployee = async (req, res) => {
  
  // After registering successfullt then genereating the token
  try {
    const response = await authService.registerEmployee(req.body);
    return res.status(200).json({
      message: `User ${req.body.name} is registered successfully....!`,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error while Registering..!", error: err.message });
  }
};

// Logic for the  login with the details given.
exports.loginEmployee = async (req, res) => {
  try {
    const token = await authService.loginEmployee(req.body, secret_key);
    res.status(200).json({ message: "Login successful!", token: token });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(400).json({ message: err.message });
  }
};
