const { verifyToken } = require("../middlewares/authJwt");
const {
  checkEmailExists,
  checkPhNoExists,
} = require("../middlewares/checkEmailPassword");
const express = require("express");
const router = express.Router();
const {
  findAll,
  updateOne,
  deleteOne,
  createOne,
  findOne,
  findById,
} = require("../controllers/employee.controller");
const validation = require("../middlewares/validation");

// Routes forgetting all the employee details except the login one.
router.get("/getall", verifyToken, findAll);

//Route for the updating the employee details by the login employee.
router.patch(
  "/update/:id",
  verifyToken,
  checkEmailExists,
  checkPhNoExists,
  updateOne,
  findById
);

// Route for deleting the employee by the login employee.
router.delete("/delete/:id", verifyToken, deleteOne);

// Route for the posting the new employee by the login employee.
router.post(
  "/create",
  verifyToken,
  validation.validateEmployeeInsertion,
  checkEmailExists,
  checkPhNoExists,
  createOne
);

// Route for getting the Single Employee used at the forget password.
router.post("/findone", validation.validateEmployeeFind, findOne);

//Route for reseting the password.
router.patch(
  "/updatepassword/:id",
  validation.validateEmployeePasswordUpdate,
  updateOne
);

module.exports = router;
