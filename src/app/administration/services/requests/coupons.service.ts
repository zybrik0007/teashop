import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
//import {environment} from '../../../../environments/environment';
import {environment} from '../../../../environments/environment.prod';

import {CouponsGetInterface} from '../../interfaces/requests/administration.requests.coupons';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) {}


  /*****Функция определения для заголовков get Запрсов*****/
  getHeaders() {
    let headersGet =  new HttpHeaders();
    headersGet =  headersGet.append('Accept', 'application/json, text/plain, */*');
    return headersGet;
  }




  /*****Get запрос*****/
  getCouponsService(req: CouponsGetInterface): Observable<object> {
    console.log('Запуск сервиса getCouponsService');

    /*Определение url*/
    const url: string = '/api/coupons/get';
    console.log('seriveURL: ', url);
    /*Определение Headers*/
    const headers = this.getHeaders();

    /*Определение QueryParameters*/
    let params = new HttpParams();
    params = params.append('rows', (req.rows).toString());
    params = params.append('page', (req.page).toString());
    params = params.append('sortName', req.sortName);
    params =  params.append('sortValue', req.sortValue);
    params =  params.append('searchName', req.searchName);

    /*Выполнение запроса на сервер*/
    return this.http.get<Observable<Response>>(url, {
      headers,
      params,
      observe: 'response'
    });

  }
}
