import { Request, Response, NextFunction } from 'express';
import {CouponsValidation} from '../../../validation_route/administration/options/validation.coupons';
import {environment} from '../../../../src/environments/environment';

const validation = new CouponsValidation();
const express = require('express');

import {CouponDB} from '../../../requests_database/administration/options/coupons.database.request';

const CouponsReqDB = new CouponDB();

export const routerCoupons = express.Router();

/*Роутеры для раздела купонов Администрирования сайта*/

routerCoupons.get(
  '',
  // tslint:disable-next-line:only-arrow-functions
  async function(
    req,
    res,
    next): Promise<any> {
    console.log('router IN');
    console.log('req: ', req.query);
    try {
      const reqValidation = await validation.
    } catch (e) {

    }
    /*
    const resValid = await validation.getCoupons(req.query);
    if (!resValid) {
      res.status(400).send(environment.errorValidationServer);
    };
    */
    const DBreq = await CouponsReqDB.getCouponDB(req.query);
    console.log('DBreq: ', DBreq);
  }
);

routerCoupons.put('', () => {
  console.log('post');
});




