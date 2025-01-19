const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./app/models/index");
const authRoutes = require("./app/routes/auth.routes");
const employee = require("./app/routes/employee.routes");

const PORT = process.env.PORT || 8081;
console.log(PORT);
const app = express();

//Running the Database for the table creation
db.sequelize
  .sync()
  .then(() => console.log("Database Sync Successfull..!"))
  .catch((err) => console.log("Error while Syncing the Database"));

//Using the middleware
app.use(express.json());

//Defining the routes for the authentication
app.use("/auth",authRoutes);
// Routes for the CRUD Operations.
app.use("/employee",employee);

// Listening the port
app.listen(PORT, () => {
  console.log("The port ins running in ", PORT);
});
