import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {CategoryGetInterface, CategoryPutInterface} from '../../../interfaces/requests/category/requests.category.interface';
import {CouponPostIdInterface} from '../../../interfaces/requests/options/requests.coupons.interface';
import {IdInterface} from '../../../interfaces/general/id.interface';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  /*Функция определения для заголовков get запроса*/
  getCategoryHeaders() {
    let headersGet =  new HttpHeaders();
    headersGet =  headersGet.append('Accept', 'application/json, text/plain, */*');
    return headersGet;
  }

  putCategoryHeaders() {
    const headersPut =  new HttpHeaders();
    headersPut.append('Content-Type', 'multipart/form-data, boundary=something');
    return headersPut;
  }

  /*Get запрос*/
  getCategoryService(req: CategoryGetInterface): Observable<object> {

    /*Определение url*/
    const url: string = '/api/category';

    /*Определение Headers*/
    const headers = this.getCategoryHeaders();

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

  /*Put запрос*/
  putCategoryService(req: FormData): Observable<object> {

    console.log('putservice');
    /*Определение url*/
    const url: string = '/api/category';
    /*Определение Headers*/
    const headers = this.putCategoryHeaders();
    /*Выполнение запроса на сервер*/
    return this.http.put(url, req, {
      headers,
      observe: 'response'
    });
  }

  /*Post запрос по id*/
  postIdCategoryService(req: IdInterface): Observable<object> {
    /*Определение url*/
    const url: string = '/api/category/id';
    /*Определение Headers*/
    const headers = this.getCategoryHeaders();
    /*Выполнение запроса на сервер*/
    return this.http.post(url, req, {
      headers,
      observe: 'response'
    });
  }
}
