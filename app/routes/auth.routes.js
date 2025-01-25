const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const {
  checkEmailExists,
  checkPhNoExists,
  checkUsernameExists
} = require("../middlewares/checkEmailPassword");
const validation = require("../middlewares/validation");
// Route for the register purpose.
router.post("/register", checkUsernameExists,checkEmailExists, checkPhNoExists,validation.validateEmployeeInsertion, register);
// Route for the login purpose.
router.post("/login",validation.validateEmployeeLogin, login);

module.exports = router;
