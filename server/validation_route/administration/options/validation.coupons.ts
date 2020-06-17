const validationModule = require('../../../validation/administration/validation.requests.administration');
const validation = new validationModule();

/*Проверка запрсов на валидность данных разделе Купоны*/
export class CouponsValidation {
  getCoupons(req): boolean {
    if (!validation.typeObj(req)) {
      return false;
    }
    if (!validation.objRows(req)) {
      return false;
    }
    if (!validation.objPage(req)) {
      return false;
    }
    if (!validation.objSearchName(req)) {
      return false;
    }
    if (!validation.objSortName(req)) {
      return false;
    }
    if (!validation.objSortValue(req)) {
      return false;
    }
    if (!validation.typeStr(req[`rows`])) {
      return false;
    }
    if (!validation.rowsValidation(req[`rows`])) {
      return false;
    }
    if (!validation.typeStr(req[`page`])) {
      return false;
    }
    if (!validation.trimStr(req[`page`])) {
      return false;
    }
    if (!validation.integerNum(req[`page`])) {
      return false;
    }
    if (!validation.zeroNum(req[`page`])) {
      return false;
    }
    if (!validation.zeroBigger(req[`page`])) {
      return false;
    }
    if (!validation.typeStr(req[`sortName`])) {
      return false;
    }
    if (!validation.sortNameCoupons(req[`sortName`])) {
      return false;
    }
    if (!validation.typeStr(req[`sortValue`])) {
      return false;
    }
    if (!validation.sortValueValidation(req[`sortValue`])) {
      return false;
    }
    return validation.typeStr(req[`searchName`]);
  }
}

