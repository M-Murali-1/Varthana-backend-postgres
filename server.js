const express = require("express");
const db = require("./app/models/index");
const authRoutes = require("./app/routes/auth.routes");
const employee = require("./app/routes/employee.routes");
const cors = require("cors");
const PORT = process.env.PORT || 8081;
const app = express();

//Running the Database for the table creation
db.sequelize
  .sync()
  .then(() => console.log("Database Sync Successfull..!"))
  .catch((err) => console.log("Error while Syncing the Database"));

//Using the middleware
app.use(cors());
app.use(express.json());

//Defining the routes for the authentication for the employees.
app.use("/auth", authRoutes);

// Routes for the CRUD Operations on employees
app.use("/employee", employee);

// Listening the port
app.listen(PORT, () => {
  console.log("The port ins running in ", PORT);
});
