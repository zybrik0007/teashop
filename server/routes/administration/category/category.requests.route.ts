import { Request, Response, NextFunction } from 'express';
import {environment} from '../../../../src/environments/environment';
const express = require('express');

import {ErrorValidation} from '../../../errors/ErrorValidation';
import {ErrorDB} from '../../../errors/ErrorDB';
import {CategoryValodation} from '../../../validation_route/administration/category/validation.category';
import {CategoryDB} from '../../../requests_database/administration/category/category.database.request';
import {routerCoupons} from '../options/coupons.requests.route';
import {ImageCategory} from '../../../image_function/category.image';

const validation = new CategoryValodation();
const CategoryReqDB = new CategoryDB();
const Image = new ImageCategory();

const fs = require('fs');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');



export const routerCategory = express.Router();

/*Роутеры для раздела купонов Администрирования сайта*/

/*Вывод таблицы купонов*/
routerCategory.get(
  '/',
  // tslint:disable-next-line:only-arrow-functions
  async function(
    req,
    res,
    next): Promise<any> {
    /*Проверка валидации данных*/
    try {
      const reqValidation = await validation.getCategory(req.query);
      if (!reqValidation[0]) {
        const error: string = JSON.stringify({error: reqValidation[1]});
        res.setHeader('Content-Type', 'application/json');
        res.status(501);
        res.send(error);
      }
      else {
        next();
      }
    } catch (e) {
      const error: string = JSON.stringify({error: ErrorValidation.ErrorValidationGeneral});
      res.setHeader('Content-Type', 'application/json');
      res.status(501);
      res.send(error);
    }
    /*Выборка из базы данных*/
    try {
      const reqDb = await CategoryReqDB.getCategoryDB(req.query);
      const response = JSON.stringify(reqDb);
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send({response});
    } catch (e) {
      const error: string = JSON.stringify({error: ErrorDB.ErrorDBGeneral});
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(error);
    }
  }
);


/*Поиск купона по id*/
routerCategory.put('/', async (
  req,
  res,
  next) => {
  /*Проверка валидации данных*/
  let idCategory = '';
  try {
    const reqValidation = await validation.putCategory(req.body);
    if (!reqValidation[0]) {
      const error: string = JSON.stringify({error: reqValidation[1]});
      res.setHeader('Content-Type', 'application/json');
      res.status(501);
      res.send(error);
    }
  } catch (e) {
    const error: string = JSON.stringify({error: ErrorValidation.ErrorValidationGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(501);
    res.send(error);
  }
  /*Добавление в базу данных*/
  try {
    const searchCode = await CategoryReqDB.searchCategoryDublicateParametrDB(req.body);
    const searchCodeValue = searchCode[0];
    if (searchCodeValue['count'] === 0) {
      const putCategory = await CategoryReqDB.putCategoryDB(req.body);
      console.log('putCategory: ', putCategory);
      idCategory = putCategory['id'];
    } else {
      const error: string = JSON.stringify({error: ErrorDB.ErrorDBCategoryParametr});
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(error);
    }
  } catch (e) {
    const error: string = JSON.stringify({error: ErrorDB.ErrorDBGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(error);
  }
  /*Создание директори в разделе картинок и добавление туда картинки*/
  const addImage = await Image.putCategoryImage(idCategory, req['files']);
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send({id: idCategory});
  /*
  try {
    console.log('Запуск функции добавления картинки');
    const putCategoryImage = await Image.putCategoryImage(idCategory, req['files']);
    console.log('Запуск функции добавления картинки прошел успешно, отправка ответа');
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send({id: idCategory});
  } catch (e) {
    console.log('Запуск функции добавления картинки прошел с ошибкой, отправка ответа');
    const error: string = JSON.stringify({error: ErrorValidation.ErrorImage});
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send({id: idCategory});
  }
  */


  /*
  console.log(req, req['files']);
  console.log('req routerCategory: ',  req, typeof(req.files['image']['path']));
  const im = req.files['image']['path'];
  const newim = path.join(__dirname + '../../../../server/image/category');
  console.log('newim: ', newim);
  gm(im)
    .resize(300, 300, '!')
    .write(newim + '/' + 'test.jpg', (err) => {
    if (!err) {
      console.log('err loaded true');
    } else {
      console.log(err);
      console.log('err loaded fuck');
    }
  });
  console.log('dirname: ', __dirname);
  */
});




