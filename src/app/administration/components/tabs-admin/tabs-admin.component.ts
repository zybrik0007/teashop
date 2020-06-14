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
  routerTrue: string;
  routerArr: string[];

  tabsObj: TabsDisplayAdminInterface[] = [
    {
      url: '/administration/orders',
      tabArr: [['/administration', 'orders' , 'orders']],
      name: ['Заказы']
    },
    {
      url: '/administration/goods',
      tabArr: [['/administration' , 'goods' , 'goods']],
      name: ['Товары']
    },
    {
      url: '/administration/category',
      tabArr: [['/administration' , 'category' , 'category'], ['/administration' , 'category' , 'subcategory']],
      name: ['Категории', 'Субкатегории']
    },
    {
      url: '/administration/clients',
      tabArr: [['/administration' , 'clients' , 'clients']],
      name: ['Клиенты']
    },
    {
      url: '/administration/options',
      tabArr: [['/administration' , 'options' , 'coupons']],
      name: ['Купоны']
    },
    {
      url: '/administration/setting',
      tabArr: [['/administration' , 'setting' , 'setting'], ['/administration' , 'setting' , 'administrators']],
      name: ['Настройки', 'Администраторы']
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
  }

}
