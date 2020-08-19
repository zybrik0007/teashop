import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


import {
  CouponsGetInterface,
  CouponsPutInterface,
  CouponPostIdInterface, CouponPostInterface
} from '../../../interfaces/requests/options/requests.coupons.interface';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) {}


  /*****Функция определения для заголовков get запроса*****/
  getCouponsHeaders() {
    let headersGet =  new HttpHeaders();
    headersGet =  headersGet.append('Accept', 'application/json, text/plain, */*');
    return headersGet;
  }


  /*****Get запрос*****/
  getCouponsService(req: CouponsGetInterface): Observable<object> {

    /*Определение url*/
    const url: string = '/api/coupons';

    /*Определение Headers*/
    const headers = this.getCouponsHeaders();

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

  /*****Put запрос*****/
  putCouponsService(req: CouponsPutInterface): Observable<object> {
    /*Определение url*/
    const url: string = '/api/coupons';
    /*Определение Headers*/
    const headers = this.getCouponsHeaders();
    /*Выполнение запроса на сервер*/
    return this.http.put(url, req, {
      headers,
      observe: 'response'
    });
  }

  /*Post запрос измения купона*/
  postCouponService(req: CouponPostInterface): Observable<object> {
    /*Определение url*/
    const url: string = '/api/coupons';
    /*Определение Headers*/
    const headers = this.getCouponsHeaders();
    /*Выполнение запроса на сервер*/
    return this.http.post(url, req, {
      headers,
      observe: 'response'
    });
  }

  /*Post запрос по id*/
  postIdCouponsService(req: CouponPostIdInterface): Observable<object> {
    /*Определение url*/
    const url: string = '/api/coupons/id';
    /*Определение Headers*/
    const headers = this.getCouponsHeaders();
    /*Выполнение запроса на сервер*/
    return this.http.post(url, req, {
      headers,
      observe: 'response'
    });
  }

}
