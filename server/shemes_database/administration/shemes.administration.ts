import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {sequel} from '../../configuration_database/configuration.database';





// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model {
  readonly id: number;
}
// Need to declare the static model so `findOne` etc. use correct types.
// tslint:disable-next-line:prefer-const
let MyModelStatic;
type MyModelStatic = typeof Model & (new (values?: object, options?: BuildOptions) => MyModel);



/*Таблицы купоны*/
export const Coupon = MyModelStatic.sequel.define('coupon', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Публикация*/
  publication: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Код*/
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Тип*/
  type: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Значение*/
  value: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Дата начала*/
  startDate: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false
  },
  /*Дата окончания*/
  endDate: {
    type: DataTypes.DATE,
    unique: false,
    allowNull: false
  },
  /*Для клинета ID*/
  clientId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Завершить полсе испольхования*/
  completion: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  }
});

/*
Coupon.sync()
  .then(
    r => {
      console.log('Add table');
    })
  .catch(e => {
    console.log('error add table');
  });
*/



