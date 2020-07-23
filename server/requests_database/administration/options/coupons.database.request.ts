import {Sequelize, Op} from 'sequelize';


import {Coupon} from '../../../shemes_database/administration/shemes.administration';

/*Класс по работе запросов купонов и БД*/
export class CouponDB {

  /*Выборка купонов по get запросу*/
  async getCouponDB(req) {
    /**/
    const limitd: number = Number(req[`page`]) * Number(req[`rows`]);
    const offsetd: number = limitd - Number(req[`rows`]);
    const getCoupon = await Coupon.findAll({
      where: {
        [Op.or]: [
          {name: {[Op.like]: '%' + req[`searchName`] + '%'}},
          {value: {[Op.like]: '%' + req[`searchName`] + '%'}}
        ]},
      order: [[req[`sortName`], req[`sortValue`]]],
      offset: offsetd,
      limit: limitd
    });
    const getCouponPars = JSON.parse(JSON.stringify(getCoupon));

    const countCoupon = await Coupon.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        [Op.or]: [
          {name: {[Op.like]: '%' + req[`searchName`] + '%'}},
          {value: {[Op.like]: '%' + req[`searchName`] + '%'}}
        ]}
    });
    const countCouponPars = JSON.parse(JSON.stringify(countCoupon));
    getCouponPars.unshift(countCouponPars);
    return getCouponPars;
  }

  async putCouponDB(req) {
    const dublicateCoupon = await Coupon.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        code: req['code']
      }
    });
    const dublicateCouponPars = JSON.parse(JSON.stringify(dublicateCoupon));
  }
}
