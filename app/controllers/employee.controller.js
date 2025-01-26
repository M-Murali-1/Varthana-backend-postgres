const employeeService = require("../services/employee.services");

// Finding all the user data except the login user.
exports.findAllEmployees = async (req, res) => {
  console.log("inside of the findall");
  console.log(req.user);

  try {
    const userData = await employeeService.findAllEmployees(req.user.id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: "Error while fetching the data" });
  }
};

// Updating the user details.
exports.updateEmployee = async (req, res) => {
  try {
    const updatedData = await employeeService.updateEmployee(
      req.body,
      req.params.id
    );
    return res.status(200).json({
      message: updatedData,
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

// Deleting the user
exports.deleteEmployee = async (req, res) => {
  console.log(req?.params);
  try {
    const response = await employeeService.deleteEmployee(req.params.id);
    return res.status(200).json(response);
  } catch (err) {
    console.log("the error is :", err.message);
    return res.status(404).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const response = await employeeService.createEmployee(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      message: "Error Occured while creating the user try again..!",
    });
  }
};

exports.findEmployeeByDetails = async (req, res) => {
  try {
    const data = [
      { username: req.body.username },
      { phone_number: req.body.phone_number },
      { email_id: req.body.email_id },
    ];
    const userData = await employeeService.findEmployeeByDetails(data);
    return res.status(200).json(userData);
  } catch (err) {
    if (err.message === "No Employee Found..!") {
      return res.status(404).json({ message: err.message });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
};
