import {Sequelize} from 'sequelize';

export const sequel = new Sequelize(
  'teashop',
  'admin',
  '123456',
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false
    },

  });



