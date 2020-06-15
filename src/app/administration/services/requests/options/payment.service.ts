import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PaymentGetInterface} from '../../../interfaces/requests/options/requests.payment.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  /*****Функция определения для заголовков get запроса*****/
  getHeaders() {
    let headersGet =  new HttpHeaders();
    headersGet =  headersGet.append('Accept', 'application/json, text/plain, */*');
    return headersGet;
  }

  /*****Get запрос*****/
  getPaymentService(req: PaymentGetInterface): Observable<object> {

    /*Определение url*/
    const url: string = '/api/payment/get';

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
