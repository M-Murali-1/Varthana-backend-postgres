const express = require("express");
const dotenv = require("dotenv").config();
const db = require("./app/models/index");
const authRoutes = require("./app/routes/auth.routes");
//console.log(db);

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

//Defining the routes
app.use("/auth",authRoutes);
// Listening the port
app.listen(PORT, () => {
  console.log("The port ins running in ", PORT);
});
