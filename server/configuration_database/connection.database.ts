const connect = require('./configuration.database.ts');
const model = require('../shemes_database/administration/shemes.administration.ts');


connect.sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение установлено.');
  })
  .catch(err => {
    console.error('Ошибка соединения:', err);
  });
