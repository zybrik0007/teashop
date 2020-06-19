import {Sequelize} from 'sequelize';
import {sequel} from './configuration.database';
import {Coupon} from '../shemes_database/administration/shemes.administration';


sequel
  .authenticate()
  .then(() => {
    console.log('Соединение установлено.');
  })
  .catch(err => {
    console.error('Ошибка соединения:', err);
  });
