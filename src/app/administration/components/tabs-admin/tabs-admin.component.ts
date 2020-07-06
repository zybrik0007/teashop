import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TabsDisplayAdminInterface} from '../../interfaces/administration.display.interface';

@Component({
  selector: 'app-tabs-admin',
  templateUrl: './tabs-admin.component.html',
  styleUrls: ['./tabs-admin.component.scss']
})
export class TabsAdminComponent implements OnInit {

  routerActive: TabsDisplayAdminInterface[];
  linkValue: string[][];
  linkName: string[];
  linkId: string[];
  routerTrue: string;
  routerArr: string[];

  /*Соотношение url и отображение вкладок*/
  tabsObj: TabsDisplayAdminInterface[] = [
    {
      url: '/administration/orders',
      tabArr: [
        ['/administration', 'orders' , 'orders'],
        ['/administration', 'orders' , 'statistics']
      ],
      name: ['Заказы', 'Статистика'],
      id: ['orders-admin-orders', 'orders-admin-statistics']
    },
    {
      url: '/administration/goods',
      tabArr: [['/administration' , 'goods' , 'goods']],
      name: ['Товары'],
      id: ['goods-admin-goods']
    },
    {
      url: '/administration/category',
      tabArr: [
        ['/administration' , 'category' , 'category'],
        ['/administration' , 'category' , 'subcategory']
      ],
      name: ['Категории', 'Субкатегории'],
      id: ['category-admin-category', 'category-admin-subcategory']
    },
    {
      url: '/administration/clients',
      tabArr: [['/administration' , 'clients' , 'clients']],
      name: ['Клиенты'],
      id: ['clients-admin-clients']
    },
    {
      url: '/administration/options',
      tabArr: [
        ['/administration' , 'options' , 'coupons'],
        ['/administration' , 'options' , 'payment'],
        ['/administration' , 'options' , 'delivery'],
        ['/administration' , 'options' , 'price'],
        ['/administration' , 'options' , 'status'],
        ['/administration' , 'options' , 'groups']
      ],
      name: ['Купоны', 'Способ оплаты', 'Способ доставки', 'Цены на доставку', 'Статус заказа', 'Группы пользователей'],
      id: ['options-admin-coupons', 'options-admin-payment', 'options-admin-delivery', 'options-admin-price', 'options-admin-status', 'options-admin-groups']
    },
    {
      url: '/administration/setting',
      tabArr: [
        ['/administration' , 'setting' , 'setting'],
        ['/administration' , 'setting' , 'administrators']
      ],
      name: ['Настройки', 'Администраторы'],
      id: ['setting-admin-setting', 'setting-admin-administrators']
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tabQuantity();
  }

  tabQuantity() {
    this.routerArr = (this.router.url.toString()).split('/');
    this.routerTrue = this.routerArr[0] + '/' + this.routerArr[1] + '/' + this.routerArr[2];
    this.routerActive = this.tabsObj.filter(el => el.url === this.routerTrue);
    this.linkValue = this.routerActive[0].tabArr;
    this.linkName = this.routerActive[0].name;
    this.linkId = this.routerActive[0].id;
  }

}
