const db = require("../models/index");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();
const employees = db.employees;
const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;

// Registering the user and storing the dat in the database.
exports.register = (req, res) => {
  //Hashing the password.
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  //If there is the confirm_passwod in the response then removing it.
  if (req.body.confirm_password) {
    delete req.body.confirm_password;
  }
  console.log(req.body);

  // After registering successfullt then genereating the token
  employees
    .create(req.body)
    .then((result) => {
      res.status(200).json({
        message: `User ${req.body.name} is registered..!`,
      });
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Error while Registering..!", error: err.message })
    );
};

// Logic for the user login.
exports.login = (req, res) => {

  //Logic if the email id and the password are not sent by the user.
  if(!req.body?.email_id) {
    return res.status(400).json({message:"Email id is required..!"});
  }
  else if(!req.body?.password) {
    return res.status(400).json({message:"Passwod is required..!"})
  }

  // Logic for finding the user based on the email id and checking with the password..!
  employees.findOne({ where: { email_id: req.body.email_id } }).then((user) => {
    
    //If no user found
    if (!user) {
      return res.status(404).json({ message: "User not found..!" });
    }

    // Comparing the password with the hashed password.
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    console.log("the password matched or not here is :", passwordMatch);

    //If password didn't Matches
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password..!" });
    }

    // If the passworrd matches then sending the token.
    const token = jwt.sign(user.dataValues, secret_key, { expiresIn: "2h" });
    res.status(200).json({ message: "Correct Password", token: token });
  });
};
