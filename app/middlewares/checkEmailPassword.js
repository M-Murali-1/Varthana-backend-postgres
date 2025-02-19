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
      // If the req.params has the ID in Updating Purpose the phonenumber can be the same.
      if (req.params.id) {
        if (!data || data.dataValues.id == req.params.id) {
          return next();
        } else {
          return res.status(400).json(phNoError);
        }
      }
      // This is used when creating the user for the first time here the mobile number should not be present already.
      else {
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

// Logic for the purpose of checking the emailid exists already.
exports.checkEmailExists = (req, res, next) => {
  employees
    .findOne({ where: { email_id: req.body.email_id } })
    .then((data) => {
      // For the updating purpose verification.
      if (req.params.id) {
        if (!data || data.dataValues.id == req.params.id) {
          return next();
        } else {
          return res.status(500).json(emailError);
        }
      }
      // For newly inserting purpose.
      else {
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
