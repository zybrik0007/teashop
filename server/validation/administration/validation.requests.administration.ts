class ValidationRequestsAdmin {

  /*Проверка что тип Строка*/
  typeStr(req) {
    return typeof(req) === 'string';
  }

  /*Проверка, что размер строки не больше 250 символов*/
  lenghtStr(req) {
    return req.length <= 250;
  }

  /*Проверка, что строка не пустая*/
  trimStr(req) {
    return req.trim().length > 0;
  }

  /*Проверка, что является целым числом*/
  integerNum(req) {
    return Number.isInteger(Number(req));
  }

  /*Проверка, что число лежит в диапозоне 0 - 100*/
  percentNum(req) {
    return Number(req) >= 0 && Number(req) <= 100;
  }

}
