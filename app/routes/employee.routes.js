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
} = require("../controllers/employee.controller");

// Routes forgetting all the employee details except the login one.
router.get("/getall", verifyToken, findAll);

//Route for the updating the employee details by the login employee.
router.patch(
  "/update/:id",
  verifyToken,
  checkEmailExists,
  checkPhNoExists,
  updateOne
);

// Route for deleting the employee by the login employee.
router.delete("/delete/:id", verifyToken, deleteOne);

// Route for the posting the new employee by the login employee.
router.post(
  "/create",
  verifyToken,
  checkEmailExists,
  checkPhNoExists,
  createOne
);

// Route for getting the Single Employee used at the forget password.
router.post("/findone", findOne);

//Route for reseting the password.
router.patch("/updatepassword/:id", updateOne);

module.exports = router;
