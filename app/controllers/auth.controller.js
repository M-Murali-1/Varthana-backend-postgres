const db = require("../models/index");
const bcrypt = require("bcryptjs");
// const dotenv = require("dotenv").config();
const employees = db.employees;
const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET;
console.log(secret_key);

exports.register = (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  employees
    .create(req.body)
    .then((result) =>
      res.json(200).json({ message: `User ${req.body.name} is registered..!` })
    )
    .catch((err) =>
      res.status(500).json({ message: "Error while Registering..!" })
    );
};
exports.login = (req, res) => {
  employees.findOne({ where: { email_id: req.body.email_id } }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found..!" });
    }
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password..!" });
    }
    const token = jwt.sign(user, secret_key, { expiresIn: "2h" });
    res.status(200).json({ message: "Correct Password", token: token });
  });
};
