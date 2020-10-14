import {Op, Sequelize} from 'sequelize';

import {Category} from '../../../shemes_database/administration/shemes.administration';
import {findAll} from '@angular/compiler-cli/ngcc/src/utils';

export class CategoryDB {

  /*Выборка категорий по get запросу*/
  async getCategoryDB(req) {
    /*Выборка массива данных по параметрам*/
    const limitd: number = Number(req['page']) * Number(req['rows']);
    const offsetd: number = limitd - Number(req['rows']);
    const getCategory = await Category.findAll({
      attributes: ['name', 'publication'],
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

  async searchCategoryDublicateParametrDB(req) {
    const dublicateCategoryParametr = await Category.findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('*')), 'count']],
      where: {
        [Op.or]: [
          {name: req['name']},
          {nickname: req['nickname']},
          {sort: [req['sort']]}
        ]
      }
    });
    return JSON.parse(JSON.stringify(dublicateCategoryParametr));
  }

  async putCategoryDB(req) {
    const putCategory = await Category.create({
      name: req['name'],
      nickname: req['nickname'],
      publication: req['publication'],
      sort: req['sort'],
      meta_title: req['metaTitle'],
      meta_description: req['metaDescription'],
      meta_keywords: req[' metaKeywords'],
      short_description: req['short'],
      description: req['description']
    });
    const putCategoryValues = putCategory['dataValues'];
    return putCategoryValues;
  }

}
