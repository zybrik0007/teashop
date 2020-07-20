import {ValidationRequestsAdmin} from '../../../validation/administration/validation.requests.administration';
import {PutInterface} from '../../../interfaces/administration/server.administration.interface';
import {ErrorValidation} from '../../../errors/ErrorValidation';


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
      if (!validationd.zeroNotBig(req['value'])) {
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



  }
}

