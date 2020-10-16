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

  putCategory(req): [boolean, string] {

    if (!validationd.typeObj(req)) {
      return [false, ErrorValidation.ErrorTypeGet];
    }
    /*Проверка наличия всех ключей, проверяемого объекта*/
    if (!req.hasOwnProperty('name')) {
      return [false, ErrorValidation.ErrorCategoryName];
    }
    if (!req.hasOwnProperty('nickname')) {
      return [false, ErrorValidation.ErrorCategoryNickname];
    }
    if (!req.hasOwnProperty('publication')) {
      return [false, ErrorValidation.ErrorCategoryPublication];
    }
    if (!req.hasOwnProperty('metaTitle')) {
      return [false, ErrorValidation.ErrorCategoryMetaTitle];
    }
    if (!req.hasOwnProperty('metaDescription')) {
      return [false, ErrorValidation.ErrorCategoryMetaDescription];
    }
    if (!req.hasOwnProperty('metaKeywords')) {
      return [false, ErrorValidation.ErrorCategoryMetaKeywords];
    }
    if (!req.hasOwnProperty('short')) {
      return [false, ErrorValidation.ErrorCategoryShort];
    }
    if (!req.hasOwnProperty('description')) {
      return [false, ErrorValidation.ErrorCategoryDescription];
    }
    /*Проверка параметра Название*/
    if (!validationd.typeStr(req['name'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    if (!validationd.trimStr(req['name'])) {
      return [false, ErrorValidation.ErrorCategoryTrimName];
    }
    if (validationd.lengthCode(req['name'])) {
      return [false, ErrorValidation.ErrorCategoryLengthName];
    }
    /*Проверка параметра Псевдоним*/
    if (!validationd.typeStr(req['nickname'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    if (!validationd.trimStr(req['nickname'])) {
      return [false, ErrorValidation.ErrorCategoryTrimName];
    }
    if (validationd.lengthCode(req['nickname'])) {
      return [false, ErrorValidation.ErrorCategoryLengthName];
    }
    if (!validationd.parametrCode(req['nickname'])) {
      return [false, ErrorValidation.ErrorCategoryNicknameNickname];
    }
    /*Проверка параметра Публикация*/
    if (!validationd.typeBoolean(!req['publication'])) {
      return [false, ErrorValidation.ErrorCategoryBooleanPublication];
    }
    /*Проверка параметра Сортировка*/
    if (!validationd.integerNum(req['sort'])) {
      return [false, ErrorValidation.ErrorCategoryIntegerSort];
    }
    /*Проверка параметра META title*/
    if (!validationd.typeStr(req['metaTitle'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    /*Проверка параметра META description*/
    if (!validationd.typeStr(req['metaDescription'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    /*Проверка параметра META keywords*/
    if (!validationd.typeStr(req['metaKeywords'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    /*Проверка параметра Краткое описание*/
    if (!validationd.typeStr(req['short'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    /*Проверка параметра Описание*/
    if (!validationd.typeStr(req['description'])) {
      return [false, ErrorValidation.ErrorCategoryStringName];
    }
    return [true, ''];
  }
}
