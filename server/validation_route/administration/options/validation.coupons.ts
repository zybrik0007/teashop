import {ValidationRequestsAdmin} from '../../../validation/administration/validation.requests.administration';
const validationd = new ValidationRequestsAdmin();
/*Проверка запрсов на валидность данных разделе Купоны*/
export class CouponsValidation {
  getCoupons(req): boolean {
    if (!validationd.typeObj(req)) {
      return false;
    }
    if (!validationd.objRows(req)) {
      return false;
    }
    if (!validationd.objPage(req)) {
      return false;
    }
    if (!validationd.objSearchName(req)) {
      return false;
    }
    if (!validationd.objSortName(req)) {
      return false;
    }
    if (!validationd.objSortValue(req)) {
      return false;
    }
    if (!validationd.typeStr(req[`rows`])) {
      return false;
    }
    if (!validationd.rowsValidation(req[`rows`])) {
      return false;
    }
    if (!validationd.typeStr(req[`page`])) {
      return false;
    }
    if (!validationd.trimStr(req[`page`])) {
      return false;
    }
    if (!validationd.integerNum(req[`page`])) {
      return false;
    }
    if (!validationd.zeroNum(req[`page`])) {
      return false;
    }
    if (!validationd.zeroBigger(req[`page`])) {
      return false;
    }
    if (!validationd.typeStr(req[`sortName`])) {
      return false;
    }
    if (!validationd.sortNameCoupons(req[`sortName`])) {
      return false;
    }
    if (!validationd.typeStr(req[`sortValue`])) {
      return false;
    }
    if (!validationd.sortValueValidation(req[`sortValue`])) {
      return false;
    }
    return validationd.typeStr(req[`searchName`]);
  }
}

