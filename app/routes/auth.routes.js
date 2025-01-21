const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {
  checkEmailExists,
  checkPhNoExists,
} = require("../middlewares/checkEmailPassword");
// Routes for the login and the register.
router.post("/register", checkEmailExists, checkPhNoExists, register);
router.post("/login", login);

module.exports = router;
