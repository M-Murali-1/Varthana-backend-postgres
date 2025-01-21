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
      res.status(200).json({ loginEmployee: req.user, otherEmployees: data });
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
  if (req.body.confirm_password) {
    delete req.body.confirm_password;
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

exports.createOne = (req, res) => {
 
  if (req.body.confirm_password) {
    delete req.body.confirm_password;
  }
  employees
    .create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `Employee - ${req.body.name} created with id-${result.dataValues.id}`,
          id: result.dataValues.id,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error Occured while creating the user tyr again..!",
      });
    });
};

exports.findOne = (req, res, next) => {
  employees
    .findAll({
      where: {
        [Op.and]: [
          { name: req.body.name },
          { phone_number: req.body.phone_number },
          { email_id: req.body.email_id },
        ],
      },
    })
    .then((result) => {
     if (result.length != 0) {
        return res
          .status(200)
          .json({ message: "Employee Found..!", id: result[0].dataValues.id });
      } else {
        return res.status(400).json({ message: "No Employee Found ..!" });
        }
    })
    .catch((err) => {
      return res.status(400).json({message:"Error while fetching..!"})
      });
};
