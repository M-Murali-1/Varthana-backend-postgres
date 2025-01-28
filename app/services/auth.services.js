const db = require("../models/index");
const bcrypt = require("bcryptjs");
const employees = db.employees;
const address = db.address;
const jwt = require("jsonwebtoken");

exports.registerEmployee = async (user) => {
  user.password = bcrypt.hashSync(user.password, 8);
  if (user.confirm_password) {
    delete user.confirm_password;
  }

  const addressData = user.address;
  delete user.address;

  const employeeResponse = await employees.create(user);
  addressData.employeeId = employeeResponse.dataValues.id;
  const addressResponse = await address.create(addressData);
  return { employeeResponse, addressResponse };
};

exports.loginEmployee = async (user, secret_key) => {
  // Logic for finding the user based on the email id and checking with the password..!
  const response = await employees.findOne({
    where: { email_id: user.email_id },
  });
  //If no user found
  if (!response) {
    throw new Error("Employee not found..!");
  }

  // Comparing the password with the hashed password.
  const passwordMatch = bcrypt.compareSync(user.password, response.password);

  //If password didn't Matches
  if (!passwordMatch) {
    console.log("here is the error");

    throw new Error("Invalid Password..!");
  }

  // If the passworrd matches then sending the token.
  const token = jwt.sign(response.dataValues, secret_key, { expiresIn: "2h" });
  return token;
};
