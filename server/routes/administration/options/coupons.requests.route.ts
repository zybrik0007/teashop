import { Request, Response, NextFunction } from 'express';
const express = require('express');
export const routerCoupons = express.Router();

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

  }
);

module.exports.routerCoupons = routerCoupons;
