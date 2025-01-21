const db = require("../models/index");
const employees = db.employees;

const phNoError = {
  type: "PhoneNoError",
  message: "Phone Number Already Exists..!",
};
const emailError = {
  type: "emailError",
  message: "Email ID Already Exists..!",
};

exports.checkPhNoExists = (req, res, next) => {
  employees
    .findOne({ where: { phone_number: req.body.phone_number } })
    .then((data) => {
      if (req.params.id) {
        if (!data || data.dataValues.id == req.params.id) {
          return next();
        } else {
          return res.status(400).json(phNoError);
        }
      } else {
        if (data) {
          return res.status(400).json(phNoError);
        } else {
          return next();
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error while validating..!" });
    });
};

exports.checkEmailExists = (req, res, next) => {
    console.log("the data came here");
    
  employees
    .findOne({ where: { email_id: req.body.email_id } })
    .then((data) => {
      if (req.params.id) {
        if (!data || data.dataValues.id == req.params.id) {
          return next();
        } else {
          return res.status(500).json(emailError);
        }
      } else {
        if (data) {
          return res.status(500).json(emailError);
        } else {
          return next();
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Error while validating..!" });
    });
};
