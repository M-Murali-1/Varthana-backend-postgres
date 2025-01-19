const { verifyToken } = require("../middlewares/authJwt");
const express = require("express");
const router = express.Router();
const {
  findAll,
  updateOne,
  deleteOne,
} = require("../controllers/employee.controller");

// Routes for porforming the CRUD Operations oon the Employees.
router.get("/getall", verifyToken, findAll);
router.patch("/update/:id",verifyToken, updateOne);
router.delete("/delete/:id",verifyToken, deleteOne);

module.exports = router;
