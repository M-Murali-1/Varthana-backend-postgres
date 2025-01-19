const db = require("../models/index");
const employees = db.employees;
const { Op } = db.Sequelize;
const bcrypt = require("bcryptjs");

// Finding all the user data except the login user.
exports.findAll = (req, res) => {
  employees
    .findAll({ where: { id: { [Op.not]: req.user.id } } })
    .then((result) => {
      data = result.map((employee) => employee.dataValues);
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error while fetching the data" })
    );
};

// Updating the user details.
exports.updateOne = (req, res) => {
 
  // If the body contains no data then sending the error.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No body found..!" });
  }

  // If we wanted to update the password then hashing the password.
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }

  // Updating the employee Details Logic.
  employees.update(req.body, { where: { id: req.params.id } }).then((num) => {
    if (num == 1) {
      return res.status(200).json({
        message: `The record with id-${req.params.id} is updated successfully..!`,
      });
    }
    return res
      .status(500)
      .json({ message: "No user found with the given id..!" });
  });
};

// Deleting the user 
exports.deleteOne = (req, res) => {

  //Logic for deleting the user.
  employees.destroy({ where: { id: req.params.id } }).then((num) => {
    if (num) {
      res.status(200).json({
        message: `The user with the id-${req.params.id} is deleted successfully..!`,
      });
    } else {
      res.status(400).json({ message: "The user with the id not found" });
    }
  });
};
