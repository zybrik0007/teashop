import {Op, Sequelize} from 'sequelize';


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

  /*Поиск дубликата по code*/
  async searchDublicateCouponDB(req) {
    const dublicateCoupon = await Coupon.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        code: req['code']
      }
    });
    return JSON.parse(JSON.stringify(dublicateCoupon));
  }

  /*Добавление купона*/
  async putCouponDB(req) {
    const putCoupon = await Coupon.create({
      publication: req['publication'],
      code: req['code'],
      type: req['type'],
      value: req['value'],
      startDate:  req['dateStart'],
      endDate: req['dateEnd'],
      clientId: req['client'],
      finish: req['finish'],
      used: 0
    });
    const putCouponValues = putCoupon['dataValues'];
    return putCouponValues;
  }

  /*Поиск купона по id*/
  async postCouponIdDB(req) {
    const postCouponId = await Coupon.findOne({
      where: {id: req['id']}
    });
    const postCouponIdParse = JSON.parse(JSON.stringify(postCouponId));
    return postCouponIdParse;
  }

  async postCouponUpdate(req) {
    const updateCoupon = await Coupon.update({
      publication: req['publication'],
      code: req['code'],
      type: req['type'],
      value: req['value'],
      startDate:  req['dateStart'],
      endDate: req['dateEnd'],
      clientId: req['client'],
      finish: req['finish']
    }, {where: {
      id: req['id']
      }
    });
    return updateCoupon;
  }
}
