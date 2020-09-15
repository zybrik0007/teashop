import {Op, Sequelize} from 'sequelize';

import {Category, Coupon} from '../../../shemes_database/administration/shemes.administration';

export class CategoryDB {

  /*Выборка категорий по get запросу*/
  async getCategoryDB(req) {
    /*Выборка массива данных по параметрам*/
    const limitd: number = Number(req['page']) * Number(req['rows']);
    const offsetd: number = limitd - Number(req['rows']);
    const getCategory = await Category.findAll({
      where: {
        name: {[Op.like]: '%' + req['searchName'] + '%'}
      },
      order: [[req['sortName'], req['sortValue']]],
      offset: offsetd,
      limit: limitd
    });
    const getCategoryPars = JSON.parse(JSON.stringify(getCategory));
    /*Выборка общего числа по параметрам*/
    const countCategory = await Category.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        name: {[Op.like]: '%' + req['searchName'] + '%'}
      },
    });
    const countCategoryPars = JSON.parse(JSON.stringify(countCategory));
    getCategoryPars.push(countCategoryPars[0]);
    return getCategoryPars;
  }
}
