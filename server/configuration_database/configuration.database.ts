import {Sequelize} from 'sequelize';
import mysql2 from 'mysql2';

export const sequel = new Sequelize(
  'teashop',
  'admin',
  '123456',
  {
    host: 'localhost',
    dialect: mysql2,
    dialectModule: mysql2,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    },

  });



