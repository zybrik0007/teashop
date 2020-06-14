import { Request, Response, NextFunction } from 'express';
const express = require('express');
export const routerCoupons = express.Router();

/*Роутеры для купонов Администрирования сайта*/

routerCoupons.get(
  '/get',
  // tslint:disable-next-line:only-arrow-functions
  async function(
    req,
    res,
    next): Promise<any> {
    console.log('Route func active');
    const test = await function(){
      return {a: '123456'};
    };
    console.log('testRoute: ', test());
    res.json(test);
  }
);

module.exports.routerCoupons = routerCoupons;
