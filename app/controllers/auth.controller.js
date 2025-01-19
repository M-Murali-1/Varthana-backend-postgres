const db = require("../models/index");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const employees = db.employees;
const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

// Registering the user and storing the dat in the database.
exports.register = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  // After registering successfullt then genereating the token
  employees
    .create(req.body)
    .then((result) => {
      const token = jwt.sign(result.dataValues, secret_key, {
        expiresIn: "2h",
      });
      res.status(200).json({
        message: `User ${req.body.name} is registered..!`,
        token: token,
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error while Registering..!", error: err.message })
    );
};
exports.login = (req, res) => {
  employees.findOne({ where: { email_id: req.body.email_id } }).then((user) => {
   
    //If no user found
    if (!user) {
      return res.status(404).json({ message: "User not found..!" });
    }
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    
    //If password didn't Matches
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password..!" });
    }
    
    // If the passworrd matches then sending the token.
    const token = jwt.sign(user.dataValues, secret_key, { expiresIn: "2h" });
    res.status(200).json({ message: "Correct Password", token: token });
  });
};
