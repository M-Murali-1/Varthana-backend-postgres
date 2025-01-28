module.exports = (sequelize, Sequelize) => {
  const DataTypes = sequelize.DataTypes;
  const Employee = sequelize.define(
    "employeTable",
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      email_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    },
    {
      tableName: "employee_details_address_managment",
    }
  );
  return Employee;
};
