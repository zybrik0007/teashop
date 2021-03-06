import { Request, Response, NextFunction } from 'express';
import {CouponsValidation} from '../../../validation_route/administration/options/validation.coupons';
import {environment} from '../../../../src/environments/environment';
import {ErrorValidation} from '../../../errors/ErrorValidation';
import {ErrorDB} from '../../../errors/ErrorDB';

const validation = new CouponsValidation();
const express = require('express');

import {CouponDB} from '../../../requests_database/administration/options/coupons.database.request';

const CouponsReqDB = new CouponDB();

export const routerCoupons = express.Router();

/*Роутеры для раздела купонов Администрирования сайта*/

/*Вывод таблицы купонов*/
routerCoupons.get(
  '/',
  // tslint:disable-next-line:only-arrow-functions
  async function(
    req,
    res,
    next): Promise<any> {
    /*Проверка валидации данных*/
    try {
      const reqValidation = await validation.getCoupons(req.query);
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
      const reqDb = await CouponsReqDB.getCouponDB(req.query);
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

/*Добавление купона*/
routerCoupons.put('/', async (
  req,
  res,
  next) => {
  /*Проверка валидации данных*/
  try {
    const reqValidation = await validation.putCoupons(req.body);
    if (!reqValidation[0]) {
      const error: string = JSON.stringify({error: reqValidation[1]});
      res.setHeader('Content-Type', 'application/json');
      res.status(501);
      res.send(error);
    }
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorValidation.ErrorValidationGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(501);
    res.send(error);
  }
  /*Добавление в базу данных*/
  try {
    const searchCode = await CouponsReqDB.searchDublicateCouponDB(req.body);
    const searchCodeValue = searchCode[0];
    if (searchCodeValue['count'] === 0) {
      const putCoupon = await CouponsReqDB.putCouponDB(req.body);
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send({id: putCoupon['id']});
    } else {
      const error: string = JSON.stringify({error: ErrorDB.ErrorDbCouponCode});
      res.setHeader('Content-Type', 'application/json');
      res.status(500);
      res.send(error);
    }
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorDB.ErrorDBGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(error);
  }
});


/*Поиск купона по id*/
routerCoupons.post('/id', async (
  req,
  res,
  next) => {
  /*Проверка валидации данных*/
  try {
    const reqValidation = await validation.postCouponId(req.body);
    if (!reqValidation[0]) {
      const error: string = JSON.stringify({error: reqValidation[1]});
      res.setHeader('Content-Type', 'application/json');
      res.status(501);
      res.send(error);
    }
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorValidation.ErrorValidationGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(501);
    res.send(error);
  }

  /*Выборка из Базы данных*/
  try {
    const reqDb = await CouponsReqDB.postCouponIdDB(req.body);
    const response = JSON.stringify(reqDb);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send({response});
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorDB.ErrorDBGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(error);
  }
});

/*Редактирование купона*/
routerCoupons.post('/', async (
  req,
  res,
  next) => {
  /*Проверка валидации данных*/
  try {
    const reqValidation = await validation.postCoupons(req.body);
    if (!reqValidation[0]) {
      const error: string = JSON.stringify({error: reqValidation[1]});
      res.setHeader('Content-Type', 'application/json');
      res.status(501);
      res.send(error);
    }
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorValidation.ErrorValidationGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(501);
    res.send(error);
  }

  /*Выборка из Базы данных*/
  try {
    const reqDb = await CouponsReqDB.postCouponUpdate(req['body']);
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send({id: reqDb['id']});
  }
  catch (e) {
    const error: string = JSON.stringify({error: ErrorDB.ErrorDBGeneral});
    res.setHeader('Content-Type', 'application/json');
    res.status(500);
    res.send(error);
  }
});








