module.exports = (sequelize, Sequelize) => {
  const DataTypes = sequelize.DataTypes;
  const Employee = sequelize.define(
    "addressTable",
    {
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "employee_details_address_managment",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      doorno: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "employee_address",
    }
  );
  return Employee;
};
