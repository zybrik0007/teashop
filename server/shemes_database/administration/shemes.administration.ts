const Seq = require('sequelize');
const connectDB = require('../../configuration_database/configuration.database.ts');



/*Таблицы купоны*/
const Coupon = connectDB.sequelize.define('coupon', {
  /*id*/
  id: {
    type: Seq.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Публикация*/
  publication: {
    type: Seq.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Код*/
  code: {
    type: Seq.STRING,
    unique: true,
    allowNull: false
  },
  /*Тип*/
  type: {
    type: Seq.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Значение*/
  value: {
    type: Seq.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Дата начала*/
  startDate: {
    type: Seq.DATE,
    unique: false,
    allowNull: false
  },
  /*Дата окончания*/
  endDate: {
    type: Seq.DATE,
    unique: false,
    allowNull: false
  },
  /*Для клинета ID*/
  clientId: {
    type: Seq.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Завершить полсе испольхования*/
  completion: {
    type: Seq.BOOLEAN,
    unique: false,
    allowNull: false
  }
});

Coupon.sync()
  .then(
    r => {
      console.log('Add table');
    })
  .catch(e => {
    console.log('error add table');
  });

module.exports.Coupon = Coupon;


