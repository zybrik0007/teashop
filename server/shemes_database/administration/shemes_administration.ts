import Sequel from 'sequelize';
require('../../configuration_database/configuration_database');

/*Таблица категорий*/
const Category = sequel.sequelize.define('category', {
  id: {                             /*id*/
    type: Sequel.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  name: {                          /*Название*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  pseudonym: {                   /*Псевдоним*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  short_description: {             /*Краткое описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  description: {                   /*Описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_title: {                  /*META title*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_description: {           /*META description*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_keywords: {             /*META keywords*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  publication: {              /*Публикация*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: false
  },
  sort: {                     /*Сортировка*/
    type: Sequel.INTEGER,
    unique: false,
    allowNull: true
  },
  photo: {                  /*Фото*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  }
});

/*Таблица субкатегорий*/
const Subcategory = sequel.sequelize.define('subcategory', {
  id: {                             /*id*/
    type: Sequel.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  name: {                          /*Название*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  pseudonym: {                   /*Псевдоним*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  short_description: {             /*Краткое описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  description: {                   /*Описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_title: {                  /*META title*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_description: {           /*META description*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_keywords: {             /*META keywords*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  publication: {              /*Публикация*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: false
  },
  categoryId: {             /*Категория*/
    type: Sequel.INTEGER,
    foreignKey : true,
    unique: false,
    allowNull: false
  },
  sort: {                 /*Сортировка*/
    type: Sequel.INTEGER,
    unique: false,
    allowNull: true
  },
  photo: {                  /*Фото*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  }
});

/*Связь между таблицами категорий и субкатегорий*/
Subcategory.hasMany(Category, {foreignKey: 'categoryId'});
Category.belongsTo(Subcategory, {foreignKey: 'categoryId'});

/*Таблица товар*/
const Good = sequel.sequelize.define('good', {
  id: {                             /*id*/
    type: Sequel.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false
  },
  name: {                          /*Название*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  pseudonym: {                   /*Псевдоним*/
    type: Sequel.STRING,
    unique: true,
    allowNull: false
  },
  short_description: {             /*Краткое описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  description: {                   /*Описание*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_title: {                  /*META title*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_description: {           /*META description*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  meta_keywords: {              /*META keywords*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
  publication: {                  /*Публикация*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: false
  },
  price: {                          /*Цена*/
    type: Sequel.FLOAT,
    unique: false,
    allowNull: false
  },
  price_NDS: {                      /*Цена с НДС*/
    type: Sequel.FLOAT,
    unique: false,
    allowNull: true
  },
  discount: {                        /*Скидка*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: true
  },
  discount_price: {                 /*Цена по скидке*/
    type: Sequel.FLOAT,
    unique: false,
    allowNull: true
  },
  weight_piece: {                   /*Вес или штука*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: false
  },
  limit: {                          /*Неограниченно*/
    type: Sequel.BOOLEAN,
    unique: false,
    allowNull: false
  },
  quantity: {                 /*Колиество*/
    type: Sequel.FLOAT,
    unique: false,
    allowNull: true
  },
  categoryId: {             /*Категория*/
    type: Sequel.INTEGER,
    foreignKey : true,
    unique: false,
    allowNull: false
  },
  subcategoryId: {             /*Cубкатегория*/
    type: Sequel.INTEGER,
    foreignKey : true,
    unique: false,
    allowNull: true
  },
  sort: {                     /*Сортировка*/
    type: Sequel.INTEGER,
    unique: false,
    allowNull: true
  },
  photo_1: {                  /*Фото 1*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  },
  photo_2: {                  /*Фото 2*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  },
  photo_3: {                  /*Фото 3*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  },
  photo_4: {                  /*Фото 4*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  },
  photo_5: {                  /*Фото 5*/
    type: Sequel.STRING,
    unique: false,
    allowNull: true
  },
  accompanying: {              /*Сопутствующий*/
    type:  Sequel.STRING,
    unique: false,
    allowNull: true
  },
});



