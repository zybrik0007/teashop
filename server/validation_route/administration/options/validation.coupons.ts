import {ValidationRequestsAdmin} from '../../../validation/administration/validation.requests.administration';
import {PutInterface} from '../../../interfaces/administration/server.administration.interface';
import {ErrorValidation} from '../../../errors/ErrorValidation';


const validationd = new ValidationRequestsAdmin();
/*Проверка запрсов на валидность данных разделе Купоны*/
export class CouponsValidation {
  rows;
  page;
  sortName;
  sortValue;
  searchName;
  getCoupons(req): [boolean, string] {
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
    if (!validationd.sortNameCoupons(req['sortName'])) {
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

  /*Проверка запроса добавления купона*/
  putCoupons(req: object): [boolean, string] {
    /*Проверка наличия всех ключей, проверяемого объекта*/
    if (!req.hasOwnProperty('publication')) {
      return [false, ErrorValidation.ErrorKeyCouponPublication];
    }
    if (!req.hasOwnProperty('code')) {
      return [false, ErrorValidation.ErrorKeyCouponCode];
    }
    if (!req.hasOwnProperty('type')) {
      return [false, ErrorValidation.ErrorKeyCouponType];
    }
    if (!req.hasOwnProperty('dateStart')) {
      return [false, ErrorValidation.ErrorKeyCouponDateStart];
    }
    if (!req.hasOwnProperty('dateEnd')) {
      return [false, ErrorValidation.ErrorKeyCouponDateEnd];
    }
    if (!req.hasOwnProperty('client')) {
      return [false, ErrorValidation.ErrorKeyCouponClient];
    }
    if (!req.hasOwnProperty('finish')) {
      return [false, ErrorValidation.ErrorKeyCouponFinish];
    }
    /*Проверка параметра Публикация*/
    if (!validationd.typeBoolean(req['publication'])) {
      return [false, ErrorValidation.ErrorCouponBooleanPublication];
    }
    /*Проверка параметра Код*/
    if (!validationd.typeStr(req['code'])) {
      return [false, ErrorValidation.ErrorCouponStringCode];
    }
    if (!validationd.trimStr(req['code'])) {
      return [false, ErrorValidation.ErrorCouponTrimCode];
    }
    if (validationd.lengthCode(req['code'])) {
      return [false, ErrorValidation.ErrorCouponLengthCode];
    }
    if (!validationd.parametrCode(req['code'])) {
      return [false, ErrorValidation.ErrorCouponCodeCode];
    }
    /*Проверка параметра Тип*/
    if (!validationd.typeStr(req['type'])) {
      return [false, ErrorValidation.ErrorCouponStringType];
    }
    if (!validationd.couponType(req['type'])) {
      return [false, ErrorValidation.ErrorCouponValueType];
    }
    /*Проверка параметра Значение*/
    if (req['value'] !== null && req['type'] === 'value') {
      if (!validationd.typeNumber(req['value'])) {
        return [false, ErrorValidation.ErrorCouponNumberValue];
      }
      if (validationd.zeroNotBig(req['value'])) {
        return [false, ErrorValidation.ErrorCouponZeroValue];
      }
    }

    if (req['value'] !== null && req['type'] === 'percent') {
      if (!validationd.typeNumber(req['value'])) {
        return [false, ErrorValidation.ErrorCouponNumberValue];
      }
      if (validationd.percentBig(req['value'])) {
        return [false, ErrorValidation.ErrorCouponPercentValue];
      }
      if (validationd.zeroNotBig(req['value'])) {
        return [false, ErrorValidation.ErrorCouponZeroValue];
      }
    }
    /*Проверка параметра даты начала*/
    if (!validationd.typeStr(req['dateStart'])) {
      return [false, ErrorValidation.ErrorCouponStringDateStart];
    }
    if (validationd.dateFormat(req['dateStart'])) {
      return [false, ErrorValidation.ErrorCouponFormatDateStart];
    }
    /*Проверка параметра даты окончания*/
    if (!validationd.typeStr(req['dateEnd'])) {
      return [false, ErrorValidation.ErrorCouponStringDateEnd];
    }
    if (validationd.dateFormat(req['dateEnd'])) {
      return [false, ErrorValidation.ErrorCouponFormatDateEnd];
    }
    /*Сравнение даты начала и даты окончания*/
    if (validationd.dateComparison(req['dateStart'], req['dateEnd'])) {
      return [false, ErrorValidation.ErrorCouponDateValidation];
    }
    /*Проверка параметра ID клиента*/
    if (req['client'] !== null) {
      if (!validationd.integerNum(req['client'])) {
        return [false, ErrorValidation.ErrorCouponIntegerClient];
      }
    }
    /*Проверка параметра Заверщить, после использования*/
    if (!validationd.typeBoolean(req['publication'])) {
      return [false, ErrorValidation.ErrorCouponBooleanPublication];
    }
  }
}

