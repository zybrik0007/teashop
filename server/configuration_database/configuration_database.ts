require('../configuration_server/configuration_server');
const Sequel = require('sequelize');
const sequel = new Sequel(
  configuration_server.name_database,
  configuration_server.user_database,
  configuration_server.password_database,
  {
    host: configuration_server.host_database,
    dialect: configuration_server.dialect_database,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });

module.exports.sequelize = sequel;
