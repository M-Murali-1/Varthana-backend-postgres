const { verifyToken } = require("../middlewares/authJwt");
const {
  checkEmailExists,
  checkPhNoExists,
  checkUsernameExists,
} = require("../middlewares/checkEmailPassword");
const express = require("express");
const router = express.Router();
const {
  findAllEmployees,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  findEmployeeByDetails,
} = require("../controllers/employee.controller");
const validation = require("../middlewares/validation");

// Routes forgetting all the employee details except the login one.
router.get("/getall", verifyToken, findAllEmployees);

//Route for the updating the employee details by the login employee.
router.patch(
  "/update/:id",
  verifyToken,
  checkUsernameExists,
  checkEmailExists,
  checkPhNoExists,
  updateEmployee
);

// Route for deleting the employee by the login employee.
router.delete("/delete/:id", verifyToken, deleteEmployee);

// Route for the posting the new employee by the login employee.
router.post(
  "/create",
  verifyToken,
  validation.validateEmployeeInsertion,
  checkUsernameExists,
  checkEmailExists,
  checkPhNoExists,
  createEmployee
);

// Route for getting the Single Employee used at the forget password.
router.post("/findone", validation.validateEmployeeFind, findEmployeeByDetails);

//Route for reseting the password.
router.patch(
  "/updatepassword/:id",
  validation.validateEmployeePasswordUpdate,
  updateEmployee
);

module.exports = router;
