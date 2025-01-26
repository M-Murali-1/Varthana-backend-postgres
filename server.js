const express = require("express");
const db = require("./app/models/index");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 8081;
const app = express();
const api = require("./app/routes/index");

//Running the Database for the table creation
db.sequelize
  .sync()
  .then(() => console.log("Database Sync Successfull..!"))
  .catch((err) => console.log("Error while Syncing the Database"));

//Using the middleware
app.use(cors());
app.use(express.json());

app.use("/api",api);

// Listening the port
app.listen(PORT, () => {
  console.log("The port ins running in ", PORT);
});
