const db = require("../models/index");
const employees = db.employees;
const { Op } = db.Sequelize;
const bcrypt = require("bcryptjs");

// Finding all the user data except the login user.
exports.findAll = (req, res) => {
  employees
    .findAll()
    .then((result) => {
      data = result.map((employee) => employee.dataValues);
      console.log("the data here is :", data);

      const [loginEmployee] = data.filter(
        (element) => element.id === req.user.id
      );
      const otherEmployees = data.filter(
        (element) => element.id != req.user.id
      );
      res.status(200).json({ loginEmployee, otherEmployees });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error while fetching the data" })
    );
};

// Updating the user details.
exports.updateOne = (req, res, next) => {
  // If the body contains no data then sending the error.
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No body found..!" });
  }
  if (req.body.confirm_password) {
    delete req.body.confirm_password;
  }
  console.log(req.body, req.params.id);

  // If we wanted to update the password then hashing the password.
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
  }

  // Updating the employee Details Logic.
  employees
    .update(req.body, { where: { id: req.params.id } })
    .then((num) => {
      if (num == 1) {
        console.log(num, req.body);
        return res.status(200).json({
          message: `The user with the id-${req.params.id} is updated successfully..!`,
        });
      } else {
        return res
          .status(404)
          .json({ message: "No user found with the given id..!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error while fetching the data" });
    });
};

// Deleting the user
exports.deleteOne = (req, res) => {
  console.log(req?.params);

  //Logic for deleting the user.
  if (!req.params?.id) {
    return res.status(400).json({ message: "The id is not found..!" });
  }
  employees.destroy({ where: { id: req.params.id } }).then((num) => {
    if (num) {
      res.status(200).json({
        id: req.params.id,
        message: "Employee deleted successfully..!",
      });
    } else {
      return res
        .status(404)
        .json({ message: "The user with the id not found" });
    }
  });
};

exports.createOne = (req, res) => {
  if (req.body.confirm_password) {
    delete req.body.confirm_password;
  }
  //Hashing the password.
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  employees
    .create(req.body)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: `Employee - ${req.body.name} created with id-${result.dataValues.id}`,
          id: result.dataValues.id,
          newEmployee: result.dataValues,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error Occured while creating the user try again..!",
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
        return res.status(404).json({ message: "No Employee Found ..!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error while fetching..!" });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  console.log("the id got here is :", id);

  employees
    .findByPk(req.params.id)
    .then((response) => {
      console.log(response.dataValues, "this is the data");
      res.status(200).json({
        message: `The user with the id-${req.params.id} is found..!`,
        Data: response.dataValues,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: "No Employee found..!" });
    });
};
