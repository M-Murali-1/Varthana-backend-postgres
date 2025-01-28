const db = require("../models/index");
const bcrypt = require("bcryptjs");
const employees = db.employees;
const address = db.address;
const jwt = require("jsonwebtoken");

exports.registerEmployee = async (user) => {
  user.password = bcrypt.hashSync(user.password, 8);
  const employeeResponse = await employees.create(user);
  return { employeeResponse };
};

exports.loginEmployee = async (user, secret_key) => {
  // Logic for finding the user based on the email id and checking with the password..!
  const response = await employees.findOne({
    where: { email_id: user.email_id },
    });

  //If no user found
  if (!response) {
    const error = new Error("Employee not found!");
    error.statusCode = 404;
    throw error;
  }

  // Comparing the password with the hashed password.
  const passwordMatch = bcrypt.compareSync(user.password, response.password);

  //If password didn't Matches
  if (!passwordMatch) {
    const error = new Error("Invalid Password!");
    error.statusCode = 401;
    throw error;
  }

  // If the passworrd matches then sending the token.
  const token = jwt.sign(response.dataValues, secret_key, { expiresIn: "2h" });
  return token;
};
