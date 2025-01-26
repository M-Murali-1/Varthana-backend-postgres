const express = require("express");
const router = express.Router();
const {
  registerEmployee,
  loginEmployee,
} = require("../controllers/auth.controller");
const {
  checkEmailExists,
  checkPhNoExists,
  checkUsernameExists,
} = require("../middlewares/checkEmailPassword");
const validation = require("../middlewares/validation");
// Route for the register purpose.
router.post(
  "/register",
  checkUsernameExists,
  checkEmailExists,
  checkPhNoExists,
  validation.validateEmployeeInsertion,
  registerEmployee
);
// Route for the login purpose.
router.post("/login", validation.validateEmployeeLogin, loginEmployee);

module.exports = router;
