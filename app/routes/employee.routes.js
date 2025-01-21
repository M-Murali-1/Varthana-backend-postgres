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

// Routes for porforming the CRUD Operations oon the Employees.
router.get("/getall", verifyToken, findAll);
router.patch(
  "/update/:id",
  verifyToken,
  checkEmailExists,
  checkPhNoExists,
  updateOne
);
router.delete("/delete/:id", verifyToken, deleteOne);
router.post(
  "/create",
  verifyToken,
  checkEmailExists,
  checkPhNoExists,
  createOne
);
router.post("/findone", findOne);
module.exports = router;
