import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {} from 'ngx-quill';

import {CouponsGetInterface} from '../../interfaces/requests/options/requests.coupons.interface';
import {PaymentGetInterface} from '../../interfaces/requests/options/requests.payment.interface';
import {DeliveryGetInterface} from '../../interfaces/requests/options/requests.delivery.interface';
import {GroupsGetInterface} from '../../interfaces/requests/options/requests.groups.interface';
import {PriceGetInterface} from '../../interfaces/requests/options/requests.price.interface';
import {StatusGetInterface} from '../../interfaces/requests/options/requests.status.interface';
import {CouponsService} from '../../services/requests/options/coupons.service';
import {DeliveryService} from '../../services/requests/options/delivery.service';
import {GroupsService} from '../../services/requests/options/groups.service';
import {PaymentService} from '../../services/requests/options/payment.service';
import {PriceService} from '../../services/requests/options/price.service';
import {StatusService} from '../../services/requests/options/status.service';


@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  rows: number;  /*Количество строк*/
  page: number; /*Страница*/
  sortName: string; /*Поле сортировки*/
  sortValue: string; /*Значение сортировки ASC или DESC*/
  searchName: string; /*Значение поля поиск*/
  countRows: number;
  modal: boolean = false; /*Активация модального окна*/
  modalNameParent: string  = 'testmodal';
  arrTable: object[];
  loader: boolean = false;


  constructor(
    private router: Router,
    private couponsService: CouponsService,
    private paymentService: PaymentService,
    private groupsService: GroupsService,
    private priceService: PriceService,
    private statusService: StatusService,
    private deliveryService: DeliveryService,
  ) {}

  ngOnInit(): void {
    this.rows = 20;
    this.page = 1;
    this.sortName = 'id';
    this.sortValue = 'ASC';
    this.searchName = '';

    /*Первичная инициализация раздела Купоны*/
    if (this.router.url === '/administration/options/coupons') {
      this.getCoupons({
          rows: this.rows,
          page: this.page,
          sortName: this.sortName,
          sortValue: this.sortValue,
          searchName: this.searchName
        });
    }

    /*Первичная инициализация раздела Способ оплаты*/
    if (this.router.url === '/administration/options/payment') {
      this.countRows = 40;
      this.getPayment({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }

    /*Первичная инициализация раздела Способ доставки*/
    if (this.router.url === '/administration/options/delivery') {
      this.countRows = 20;
      this.rows = 20;
      this.getDelivery({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }

    /*Первичная инициализация раздела Цены на доставку*/
    if (this.router.url === '/administration/options/price') {
      this.countRows = 80;
      this.rows = 20;
      this.getPrice({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }

    /*Первичная инициализация раздела Статус заказа*/
    if (this.router.url === '/administration/options/status') {
      this.getStatus({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }

    /*Первичная инициализация раздела Группы пользователей*/
    if (this.router.url === '/administration/options/groups') {
      this.getGroups({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }
  }

  UpdatePage(event: object) {
    const key = Object.keys(event);
    switch (key[0]) {
      case('rows'):  {
        this.rows = Number(event['rows']);
        this.page = 1;
        break;
      }
      case('page'): {
        this.page = Number(event['page']);
        break;
      }
      case('search'): {
        this.searchName = event['search'];
        this.page = 1;
        break;
      }
      case('sort'): {
        const objSort = event['sort'];
        this.sortName = objSort['sortName'];
        this.sortValue = objSort['sortValue'];
        break;
      }
    }

    if (this.router.url === '/administration/options/coupons') {
      this.getCoupons({
        rows: this.rows,
        page: this.page,
        sortName: this.sortName,
        sortValue: this.sortValue,
        searchName: this.searchName
      });
    }
  }



  /***** Функции requests запросов к серверу *****/
  /*Купоны*/
  /*Выборка купонов для таблицы Купоны*/
  getCoupons(getParameter: CouponsGetInterface) {
    this.loader = true;
    this.couponsService.getCouponsService(getParameter)
      .subscribe(
        res => {
          this.loader = true;
          try {
            if (res['status'] === 200) {
              const response = JSON.parse(res['body']['response']);
              this.countRows = Number(response[0]);
              this.arrTable = response;
              console.log('this.arrTable: ', this.arrTable);
            }
            else if (res['status'] === 500) {
              const error = JSON.parse(res['body']['response']);
              console.log('error 500: ', error);
            }
            else if (res['status'] === 501) {
              const error = JSON.parse(res['body']['response']);
              console.log('error 501: ', error);
            }
          } catch (err) {
            console.log('Error parse');
          }
          this.loader = false;
        },
        error => {
          console.log('Error Client: ', error);
        }
        );

  }

  /*Способ оплаты*/
  /*Выборка сопособ оплаты для таблицы Способы оплаты*/
  getPayment(getParameter: PaymentGetInterface) {
    this.paymentService.getPaymentService(getParameter)
      .subscribe(
        res => {
          if (res['status'] === 200) {
            const response = JSON.parse(res['body']['response']);
            this.countRows = Number(response[0]);
            this.arrTable = response;
            console.log('this.arrTable: ', this.arrTable);
          } else {
            console.log('Error Response Parse');
          }
        },
        error => {
          console.log('Error Client: ', error);
        }
      );
  }

  /*Способ доставки*/
  /*Выборка способов доставки для таблицы Способ доставки*/
  getDelivery(getParameter: DeliveryGetInterface) {
    this.deliveryService.getDeliveryService(getParameter)
      .subscribe(
        res => {},
        error => {}
      );
  }

  /*Цены на доставку*/
  /*Выборка цен на доставку для таблицы Цены на доставку*/
  getPrice(getParameter: PriceGetInterface) {
    this.priceService.getPriceService(getParameter)
      .subscribe(
        res => {},
        error => {}
      );
  }

  /*Статус заказа*/
  /*Выборка статусов заказа для таблицы Статус заказа*/
  getStatus(getParameter: StatusGetInterface) {
    this.statusService.getStatusService(getParameter)
      .subscribe(
        res => {},
        error => {}
      );
  }

  /*Группа пользователей*/
  /*Выборка сопособ групп пользователей для таблицы Статус заказа*/
  getGroups(getParameter: GroupsGetInterface) {
    this.groupsService.getGroupsService(getParameter)
      .subscribe(
        res => {},
        error => {}
      );
  }

    /***** *****/

    add() {
      if (this.router.url === '/administration/options/coupons') {
        this.modal = true;
        this.modalNameParent = 'add-coupon';
      }
      if (this.router.url === '/administration/options/payment') {
        this.modal = true;
        this.modalNameParent = 'add-payment';
      }
      if (this.router.url === '/administration/options/delivery') {
        this.modal = true;
        this.modalNameParent = 'add-delivery';
      }
      if (this.router.url === '/administration/options/price') {
        this.modal = true;
        this.modalNameParent = 'add-price';
      }
      if (this.router.url === '/administration/options/status') {
        this.modal = true;
        this.modalNameParent = 'add-status';
      }
      if (this.router.url === '/administration/options/groups') {
        this.modal = true;
        this.modalNameParent = 'add-group';
      }
    }
}
