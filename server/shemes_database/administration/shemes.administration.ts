import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {sequel} from '../../configuration_database/configuration.database';

// We need to declare an interface for our model that is basically what our class would be
interface MyModel extends Model {
  readonly id: number;
}
// Need to declare the static model so `findOne` etc. use correct types.
// tslint:disable-next-line:prefer-const
//let MyModelStatic;
type MyModelStatic = typeof Model & (new (values?: object, options?: BuildOptions) => MyModel);

/*Таблица администраторы*/
export const Administrator = <MyModelStatic> sequel.define('administrator', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Логин*/
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Пароль*/
  password: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false
  },
  /*Фамилия*/
  surname: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false
  },
/*Имя*/
  name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false
  },
  /*Отчество*/
  middle: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});

/*Таблица налоги*/
export const Tax = <MyModelStatic> sequel.define('tax', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Значение*/
  value: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  }
});

/*Таблицы купоны*/
export const Coupon = <MyModelStatic> sequel.define('coupon', {
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

/*Способ оплаты*/
export const Payment = <MyModelStatic> sequel.define('payment', {
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
  /*Тип*/
  type: {
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
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Имя скрипта*/
  name_script: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Выберити налог*/
  taxId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  },
  /*Цена*/
  price: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Тип цены*/
  price_type: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Изображение URL*/
  url_image: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Описание*/
  description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Показывать описание в заказе*/
  description_on: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Показывать стандартные банковские данные в счете*/
  bank_on: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Описание в счете*/
  description_account: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});
/*Связь таблицы Способ оплаты и таблицы Налоги*/
Payment.hasMany(Tax, {foreignKey: 'taxId'});
Tax.belongsTo(Payment, {foreignKey: 'taxId'});

/*Способ доставки*/
export const Delivery =  <MyModelStatic> sequel.define('delivery', {
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
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Системы оплаты*/
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Изображение URL*/
  url_image: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Описание*/
  description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});

/*Цены на доставку*/
export const Price = <MyModelStatic> sequel.define('price', {
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Цена*/
  price: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Налог*/
  taxId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  },
  /*Стоимость упаковки*/
  packing_price: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Налог на упаковку*/
  packing_taxId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  }
});
/*Связь таблицы Способ оплаты и таблицы Налоги*/
Price.hasMany(Tax, {foreignKey: 'taxId'});
Tax.belongsTo(Price, {foreignKey: 'taxId'});
Price.hasMany(Tax, {foreignKey: 'packing_taxId'});
Tax.belongsTo(Price, {foreignKey: 'packing_taxId'});

/*Статус заказа*/
export const Status = <MyModelStatic> sequel.define('status', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Код*/
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});

/*Группы пользователей*/
export const Group = <MyModelStatic> sequel.define('group', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Установить по умолчанию*/
  default: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Скидка*/
  discount : {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Описание*/
  description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});

/*Таблица категорий*/
const Category = <MyModelStatic> sequel.define('category', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Краткое описание*/
  short_description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Описание*/
  description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META title*/
  meta_title: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META description*/
  meta_description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META keywords*/
  meta_keywords: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Публикация*/
  publication: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Сортировка*/
  sort: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Фото*/
  photo: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});

/*Таблица субкатегорий*/
const Subcategory = <MyModelStatic> sequel.define('subcategory', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Краткое описание*/
  short_description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Описание*/
  description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META title*/
  meta_title: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META description*/
  meta_description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META keywords*/
  meta_keywords: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Публикация*/
  publication: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Категория*/
  categoryId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  },
  /*Сортировка*/
  sort: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Фото*/
  photo: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  }
});

/*Связь между таблицами категорий и субкатегорий*/
Subcategory.hasMany(Category, {foreignKey: 'categoryId'});
Category.belongsTo(Subcategory, {foreignKey: 'categoryId'});

/*Таблица товар*/
const Good = <MyModelStatic> sequel.define('good', {
  /*id*/
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  /*Название*/
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Псевдоним*/
  pseudonym: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  /*Краткое описание*/
  short_description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Описание*/
  description: {
    type:  DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META title*/
  meta_title: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META description*/
  meta_description: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*META keywords*/
  meta_keywords: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Публикация*/
  publication: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Цена*/
  price: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: false
  },
  /*Цена с НДС*/
  price_NDS: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: true
  },
  /*Скидка*/
  discount: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: true
  },
  /*Цена по скидке*/
  discount_price: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: true
  },
  /*Вес или штука*/
  weight_piece: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Неограниченно*/
  limit: {
    type: DataTypes.BOOLEAN,
    unique: false,
    allowNull: false
  },
  /*Колиество*/
  quantity: {
    type: DataTypes.FLOAT,
    unique: false,
    allowNull: true
  },
  /*Категория*/
  categoryId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: false
  },
  /*Cубкатегория*/
  subcategoryId: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Сортировка*/
  sort: {
    type: DataTypes.INTEGER,
    unique: false,
    allowNull: true
  },
  /*Фото 1*/
  photo_1: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Фото 2*/
  photo_2: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Фото 3*/
  photo_3: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Фото 4*/
  photo_4: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Фото 5*/
  photo_5: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
  /*Сопутствующий*/
  accompanying: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: true
  },
});



Coupon.sync().then(r => {console.log('Add table coupon');}).catch(e => {console.log('error add table coupon');});




