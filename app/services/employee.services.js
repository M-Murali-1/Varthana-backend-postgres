const db = require("../models/index");
const employees = db.employees;
const address = db.address;
const { Op } = db.Sequelize;
const bcrypt = require("bcryptjs");

exports.findAllEmployees = async (id) => {
  const response = await employees.findAll({
    include: [
      {
        model: address,
        as: "address",
        required: false,
      },
    ],
  });

  const userInfo = response.map((employee) => employee.dataValues);

  const [loginEmployee] = userInfo.filter((element) => element.id == id);
  const otherEmployees = userInfo.filter((element) => element.id != id);
  return { loginEmployee, otherEmployees };
};

exports.updateEmployee = async (userData, id) => {
  // If the body contains no data then sending the error.
  if (Object.keys(userData).length === 0) {
    throw new Error("No body found..!");
  }
  if (userData.confirm_password) {
    delete userData.confirm_password;
  }

  // If we wanted to update the password then hashing the password.
  if (userData.password) {
    userData.password = bcrypt.hashSync(userData.password, 8);
  }
  const addressData = userData.address;
  delete userData.address;
  const response = await employees.update(userData, {
    where: { id: id },
  });
  if (response == 1) {
    if (addressData) {
      addressData.employeeId = id;

      const addressResponse = await address.update(addressData, {
        where: { employeeId: id },
      });
    }
    return `The user with the id-${id} is updated successfully..`;
  } else {
    throw new Error("No user found with the given id..!");
  }
};

exports.deleteEmployee = async (id) => {
  if (!id) {
    throw new Error("The ID is not found..!");
  }
  const userData = await employees.destroy({ where: { id: id } });
  if (userData) {
    return { id: id, message: "Employee deleted successfully here..!" };
  } else {
    throw new Error("The user with the id not found..!");
  }
};

exports.createEmployee = async (employee) => {
  if (employee.confirm_password) {
    delete employee.confirm_password;
  }
  employee.password = bcrypt.hashSync(employee.password, 8);
  const addressData = employee.address;
  delete employee.address;
  const employeeData = await employees.create(employee);
  addressData.employeeId = employeeData.dataValues.id;
  const addressResponse = await address.create(addressData);
  return {
    message: `Employee - ${employee.name} created with id-${employeeData.dataValues.id}`,
    id: employeeData.dataValues.id,
    newEmployee: employeeData.dataValues,
  };
};

exports.findEmployeeByDetails = async (user) => {
  const userData = await employees.findAll({
    where: {
      [Op.and]: user,
    },
  });
  if (userData.length != 0) {
    return { message: "Employee Found..!", id: userData[0].dataValues.id };
  } else {
    throw new Error("No Employee Found..!");
  }
};
