const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Routes for the login and the register.
router.post("/register", register);
router.post("/login", login);

module.exports = router;
