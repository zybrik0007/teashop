import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CouponsGetInterface} from '../../interfaces/requests/administration.requests.coupons';
import {CouponsService} from '../../services/requests/coupons.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {


  @Input() rows: number;  /*Количество строк*/
  @Input() page: number; /*Страница*/
  @Input() sortName: string; /*Поле сортировки*/
  @Input() sortValue: string; /*Значение сортировки ASC или DESC*/
  @Input() searchName: string; /*Значение поля поиск*/



  constructor(
    private router: Router,
    private couponsService: CouponsService
  ) {}

  ngOnInit(): void {
    this.rows = 20;
    this.page = 1;
    this.sortName = 'id';
    this.sortValue = 'ASC';
    this.searchName = '';

    /*Первичная инициализация таблицы купоны*/
    if (this.router.url === '/administration/options/coupons') {
      console.log('Определение url - /administration/options/coupons в main component');
      this.getCoupons(
        {
          rows: this.rows,
          page: this.page,
          sortName: this.sortName,
          sortValue: this.sortValue,
          searchName: this.searchName
        }
      );
    }
  }

  /***** Функции выборки данных для таблиц *****/
  /*Выборка купонов*/
  getCoupons(getParameter: CouponsGetInterface) {
    console.log('Запуск функции getCoupons в main component');
    this.couponsService.getCouponsService(getParameter)
      .subscribe(
        value => {
          console.log('Ответ сервера: ', value);
        },
        error => {
          console.log('Ошибка вывода таблицы coupons');
        }
        );
  }
  /***** *****/

}
