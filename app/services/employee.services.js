const db = require("../models/index");
const employees = db.employees;
const address = db.address;
const { Op } = db.Sequelize;
const bcrypt = require("bcryptjs");

exports.findAllEmployees = async (id) => {
  const response = await employees.findAll({
    attributes: ["id", "name", "username", "phone_number", "email_id", "Role"],
    include: [
      {
        model: address,
        as: "address",
        required: false,
        attributes: ["street", "doorno", "city"],
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
    // throw new Error("No body found..!");
    const error = new Error("No body found..!");
    error.statusCode = 404;
    throw error;
  }

  // If we wanted to update the password then hashing the password.
  if (userData.password) {
    userData.password = bcrypt.hashSync(userData.password, 8);
  }
  const addressData = userData.address;

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
    const error = new Error("No user found with the given id..!");
    error.statusCode = 404;
    throw error;
  }
};

exports.deleteEmployee = async (id) => {
  console.log("the id here ", id);

  if (!id) {
    const error = new Error("The ID is not found in the request..!");
    error.statusCode = 400;
    throw error;
  }
  const userData = await employees.destroy({ where: { id: id } });
  if (userData) {
    return { id: id, message: "Employee deleted successfully here..!" };
  } else {
    const error = new Error("The Employee with the id not found..!");
    error.statusCode = 400;
    throw error;
  }
};

exports.createEmployee = async (employee) => {
  employee.password = bcrypt.hashSync(employee.password, 8);
  const employeeData = await employees.create(employee);
  const addressData ={employeeId:employeeData.id,doorno:"",street:"",city:""};
  const addressResponse = await address.create(addressData) 
  const employeeInfo = await employees.findOne({
    where: { id: employeeData.id },
    attributes: ["id", "name", "username", "phone_number", "email_id", "Role"],
    include: [
      {
        model: address,
        as: "address",
        required: false,
        attributes: ["street", "doorno", "city"],
      },
    ],
  });
  return {
    message: `Employee - ${employee.name} created with id-${employeeData.dataValues.id}`,
    id: employeeData.dataValues.id,
    newEmployee: employeeInfo,
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
    const error = new Error("No Employee Found..!");
    error.statusCode = 404;
    throw error;
  }
};
