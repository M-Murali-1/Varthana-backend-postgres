const express = require("express");
const authRoutes = require("./auth.routes");
const employee = require("./employee.routes");
const router = express.Router();



//Defining the routes for the authentication for the employees.
router.use("/auth", authRoutes);

// Routes for the CRUD Operations on employees
router.use("/employee", employee);


module.exports = router;
