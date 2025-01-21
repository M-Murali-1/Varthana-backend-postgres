const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {
  checkEmailExists,
  checkPhNoExists,
} = require("../middlewares/checkEmailPassword");

// Route for the register purpose.
router.post("/register", checkEmailExists, checkPhNoExists, register);
// Route for the login purpose.
router.post("/login", login);

module.exports = router;
