import {ValidationRequestsAdmin} from '../../../validation/administration/validation.requests.administration';
import {PutInterface} from '../../../interfaces/administration/server.administration.interface';
import {ErrorValidation} from '../../../errors/ErrorValidation';

const validationd = new ValidationRequestsAdmin();

export class CategoryValodation {

  /*Проверка запроса категорий, для главной таблицы*/
  getCategory(req): [boolean, string] {
    if (!validationd.typeObj(req)) {
      return [false, ErrorValidation.ErrorTypeGet];
    }
    if (!req.hasOwnProperty(`rows`)) {
      return [false, ErrorValidation.ErrorRows];
    }
    if (!req.hasOwnProperty('page')) {
      return [false, ErrorValidation.ErrorPage];
    }
    if (!req.hasOwnProperty('sortName')) {
      return [false, ErrorValidation.ErrorSortName];
    }
    if (!req.hasOwnProperty('sortName')) {
      return [false, ErrorValidation.ErrorSortValue];
    }
    if (!req.hasOwnProperty('sortValue')) {
      return [false, ErrorValidation.ErrorSortValue];
    }
    if (!req.hasOwnProperty('searchName')) {
      return [false, ErrorValidation.ErrorSearchName];
    }
    if (!validationd.typeStr(req['rows'])) {
      return [false, ErrorValidation.ErrorStringRows];
    }
    if (!validationd.rowsValidation(req['rows'])) {
      return [false, ErrorValidation.ErrorValueRows];
    }
    if (!validationd.typeStr(req['page'])) {
      return [false, ErrorValidation.ErrorStringPage];
    }
    if (!validationd.trimStr(req['page'])) {
      return [false, ErrorValidation.ErrorTrimPage];
    }
    if (!validationd.integerNum(req['page'])) {
      return [false, ErrorValidation.ErrorIntegerPage];
    }
    if (validationd.zeroNum(req['page'])) {
      return [false, ErrorValidation.ErrorZeroPage];
    }
    if (!validationd.zeroBigger(req['page'])) {
      return [false, ErrorValidation.ErrorBiggerZeroPage];
    }
    if (!validationd.typeStr(req['sortName'])) {
      return [false, ErrorValidation.ErrorStringSortName];
    }
    if (!validationd.sortNameCategory(req['sortName'])) {
      return [false, ErrorValidation.ErrorValueSortName];
    }
    if (!validationd.typeStr(req['sortValue'])) {
      return [false, ErrorValidation.ErrorStringSortValue];
    }
    if (!validationd.sortValueValidation(req['sortValue'])) {
      return [false, ErrorValidation.ErrorValueSortValue];
    }
    if (!validationd.typeStr(req['searchName'])) {
      return [false, ErrorValidation.ErrorStringSearchName];
    }
    return [true, ''];
  }
}
