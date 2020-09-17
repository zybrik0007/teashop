import { Request, Response, NextFunction } from 'express';
import {environment} from '../../../../src/environments/environment';
const express = require('express');

import {ErrorValidation} from '../../../errors/ErrorValidation';
import {ErrorDB} from '../../../errors/ErrorDB';
import {CategoryValodation} from '../../../validation_route/administration/category/validation.category';
import {CategoryDB} from '../../../requests_database/administration/category/category.database.request';

const validation = new CategoryValodation();
const CategoryReqDB = new CategoryDB();

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



