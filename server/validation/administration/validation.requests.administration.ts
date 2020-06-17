class ValidationRequestsAdmin {

  /*Проверка что тип Строка*/
  typeStr(req): boolean {
    return typeof(req) === 'string';
  }

  /*Проверка, что размер строки не больше 250 символов*/
  lenghtStr(req): boolean {
    return req.length <= 250;
  }

  /*Проверка, что строка не пустая*/
  trimStr(req): boolean {
    return req.trim().length > 0;
  }

  /*Проверка, что является целым числом*/
  integerNum(req): boolean {
    return Number.isInteger(Number(req));
  }

  /*Проверка, что не равно нулю*/
  zeroNum(req): boolean {
    return req === '0';
  }

  /*Проверка, что не равно нулю*/
  zeroBigger(req): boolean {
    return Number(req) > 0;
  }

  /*Проверка, что число лежит в диапозоне 0 - 100*/
  percentNum(req): boolean {
    return Number(req) >= 0 && Number(req) <= 100;
  }

  /*Проверка, что входящие данные это объект*/
  typeObj(req): boolean {
    return Object.prototype.toString.call(req) === '[object Object]';
  }

  /*Проверка объекта на наличие свойства rows*/
  objRows(req): boolean {
    return req.hasOwnProperty('rows');
  }
  /*Проверка объекта на наличие свойства page*/
  objPage(req): boolean {
    return req.hasOwnProperty('page');
  }
  /*Проверка объекта на наличие свойства sortName*/
  objSortName(req): boolean {
    return req.hasOwnProperty('sortName');
  }
  /*Проверка объекта на наличие свойства sortValue*/
  objSortValue(req): boolean {
    return req.hasOwnProperty('sortValue');
  }
  /*Проверка объекта на наличие свойства searchName*/
  objSearchName(req): boolean {
    return req.hasOwnProperty('searchName');
  }

  /*Проверка свойства Rows*/
  rowsValidation(req): boolean {
    return (req === '20' || req === '50' || req === '100');
  }

  /*Проверка свойства sortName для таблицы Купоны*/
  sortNameCoupons(req): boolean {
    return (req === 'id' || req === 'code' || req === 'value' ||
      req === 'name' || req === 'startDate' || req === 'endDate' ||
      req === 'completion' || req === 'publication' || req === 'clientId');
  }

  /*Проверка свойства Rows*/
  sortValueValidation(req): boolean {
    return (req === 'ASC' || req === 'DESC');
  }


}

module.exports =  ValidationRequestsAdmin;
