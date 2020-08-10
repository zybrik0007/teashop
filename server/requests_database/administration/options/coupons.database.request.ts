import {Sequelize, Op} from 'sequelize';


import {Coupon} from '../../../shemes_database/administration/shemes.administration';

/*Класс по работе запросов купонов и БД*/
export class CouponDB {

  /*Выборка купонов по get запросу*/
  async getCouponDB(req) {
    /*Выборка массива данных по параметрам*/
    const limitd: number = Number(req['page']) * Number(req['rows']);
    const offsetd: number = limitd - Number(req['rows']);
    const getCoupon = await Coupon.findAll({
      where: {
        [Op.or]: [
          {code: {[Op.like]: '%' + req['searchName'] + '%'}},
          {value: {[Op.like]: req['searchName'] }},
          {type: {[Op.like]: '%' + req['searchName'] + '%'}}
        ]},
      order: [[req['sortName'], req['sortValue']]],
      offset: offsetd,
      limit: limitd
    });
    const getCouponPars = JSON.parse(JSON.stringify(getCoupon));
    /*Выборка общего числа по параметрам*/
    const countCoupon = await Coupon.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        [Op.or]: [
          {code: {[Op.like]: '%' + req['searchName'] + '%'}},
          {value: {[Op.like]: req['searchName']}},
          {type: {[Op.like]: '%' + req['searchName'] + '%'}}
        ]}
    });
    const countCouponPars = JSON.parse(JSON.stringify(countCoupon));
    getCouponPars.push(countCouponPars[0]);
    return getCouponPars;
  }

  async searchDublicateCouponDB(req) {
    const dublicateCoupon = await Coupon.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        code: req['code']
      }
    });
    return dublicateCoupon;
  }
}
