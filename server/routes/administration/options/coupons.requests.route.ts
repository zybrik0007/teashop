import { Request, Response, NextFunction } from 'express';
import {CouponsValidation} from '../../../validation_route/administration/options/validation.coupons';
import {environment} from '../../../../src/environments/environment';

const validation = new CouponsValidation();
const express = require('express');
const routerCoupons = express.Router();

/*Роутеры для раздела купонов Администрирования сайта*/

routerCoupons.get(
  '/get',
  // tslint:disable-next-line:only-arrow-functions
  async function(
    req,
    res,
    next): Promise<any> {
    console.log('router IN');
    console.log('req: ', req.query);
    const resValid = await validation.getCoupons(req.query);
    if (!resValid) {
      res.status(400).send(environment.errorValidationServer);
    };


  }
);

module.exports.routerCoupons = routerCoupons;
