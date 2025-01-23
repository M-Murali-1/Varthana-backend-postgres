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
module.exports = db;
