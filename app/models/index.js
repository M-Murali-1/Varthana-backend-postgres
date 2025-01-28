const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.employees = require("./employee.model")(sequelize, Sequelize);
db.address = require("./address.model")(sequelize, Sequelize);

db.employees.hasOne(db.address, { foreignKey: "employeeId" ,as: "address"});
db.address.belongsTo(db.employees, { foreignKey: "employeeId" });

module.exports = db;
