import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.scss']
})
export class FooterAdminComponent implements OnInit, OnChanges {



  @Input() countRows: number;
  rows: number = 20;

  @Output() rowsUpt: EventEmitter<object> = new EventEmitter<object>();
  @Output() pageUpt: EventEmitter<object> = new EventEmitter<object>();


  firstPage: number;
  endPage: number;
  activePage: number;
  arrayPage: number[];
  pageDis: boolean;
  sum: number;


  constructor(
    el: ElementRef,
    r: Renderer2
  ) {
  }

  ngOnInit(): void {
    console.log('this.countRows: ', this.countRows);
    console.log('this.rows: ', this.rows);
    this.sum = Math.ceil(this.countRows / this.rows);
    this.FirstPageDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const dataChangeFotter = changes['countRows'];
    console.log('changes: ', dataChangeFotter);
    if (!dataChangeFotter['firstChange']) {
      this.countRows = dataChangeFotter['currentValue'];
      this.ngOnInit();
    }
  }

  /*Первичная инициализця*/
  FirstPageDisplay() {
    this.pageDis = this.sum > 1;
    this.firstPage = 1;
    this.endPage = (this.sum > 5) ? 5 : this.sum;
    this.activePage = this.firstPage;
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = arrd;
    const ac = document.getElementsByClassName('page');
    this.activePage = 1;
  }

  /*Изменение, при нажатии на странцу*/
  UpdatePageDisplay(clickItem) {
    const arrd = [];
    if (clickItem === this.endPage && clickItem !== this.sum) {
      this.firstPage = clickItem;
      this.endPage = this.firstPage + 4;
      if (this.endPage > this.sum) {
        this.endPage = this.sum;
      }
      if (this.firstPage > 99 || this.endPage > 99) {
        this.endPage = this.endPage - 2;
      }
      if (this.firstPage > 999 || this.endPage > 999) {
        this.endPage = this.endPage - 1;
      }
      if (this.firstPage > 9999 || this.endPage > 9999) {
        this.firstPage = this.endPage = clickItem;
      }
      for (let i = this.firstPage; i <= this.endPage; i++) {
        arrd.push(i);
      }
      this.arrayPage = [];
      console.log('Upt 1 arrayPage ', this.arrayPage);
      this.arrayPage = arrd;
    }

    else if (clickItem === this.firstPage && clickItem !== 1) {
      this.endPage = clickItem;
      this.firstPage = this.endPage - 4;
      if (this.firstPage < 1) {
        this.firstPage = 1;
      }
      if (this.firstPage > 99 || this.endPage > 99) {
        this.endPage = this.endPage - 2;
      }
      if (this.firstPage > 999 || this.endPage > 999) {
        this.endPage = this.endPage - 1;
      }
      if (this.firstPage > 9999 || this.endPage > 9999) {
        this.firstPage = this.endPage = clickItem;
      }
      for (let i = this.firstPage; i <= this.endPage; i++) {
        arrd.push(i);
      }
      this.arrayPage = [];
      console.log('Upt 2 arrayPage ', this.arrayPage);
      this.arrayPage = arrd;
    }
    this.activePage = clickItem;
    this.emitPage();
  }

  /*Нажатие на странцу*/
  UpdatePage(event) {
    const clickItem = Number(event.target.innerText);
    this.UpdatePageDisplay(clickItem);
  }

  /*Нажатие на кнеопку увелечения на одну страницу*/
  pageButtonPlus() {
    const sum: number = Math.ceil(this.countRows / this.rows);
    this.activePage = this.activePage  + 1;
    if (this.activePage >= this.endPage) {
      this.firstPage = this.activePage;
      if (this.activePage > this.endPage) {
        this.endPage = this.endPage + 5;
      } else {
        this.endPage = this.endPage + 4;
      }
      if (this.firstPage > 99 || this.endPage > 99) {
        this.endPage = this.endPage  - 2;
      }
      if (this.firstPage > 999 || this.endPage > 999) {
        this.endPage = this.endPage  - 1;
      }
      if (this.firstPage > 9999 || this.endPage > 9999) {
        this.endPage =  this.activePage;
      }
    }
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = [];
    this.arrayPage = arrd;
    this.emitPage();
  }

  /*Нажатие на кнеопку уменьшения на одну страницу*/
  pageButtomMinus() {
    this.activePage = this.activePage - 1;
    if (this.activePage < 1) {
      this.activePage = 1;
    }
    if (this.activePage <= this.firstPage) {
      if (this.activePage < this.firstPage) {
        this.firstPage = this.firstPage - 5;
      } else {
        this.firstPage = this.firstPage - 4;
      }
      this.endPage = this.activePage;
      if (this.firstPage <= 1) {
        this.firstPage = 1;
        if (this.sum > 5) {
          this.endPage = 5;
        }
        else {
          this.endPage = this.sum;
        }
      }
      if (this.firstPage > 99 || this.endPage > 99) {
        this.firstPage = this.firstPage + 2;
      }
      if (this.firstPage > 999 || this.endPage > 999) {
        this.firstPage = this.firstPage + 1;
      }
      if (this.firstPage > 9999 || this.endPage > 9999) {
        this.firstPage = this.activePage;
      }
      const arrd = [];
      for (let i = this.firstPage; i <= this.endPage; i++) {
        arrd.push(i);
      }
      this.arrayPage = [];
      this.arrayPage = arrd;
    }
    this.emitPage();
  }

  /*Нажатие на кнеопку для вывода последний страницы*/
  pageButtonEnd() {
    this.activePage = this.endPage = this.sum;
    this.firstPage = this.sum - 4;
    if (this.firstPage < 1) {
      this.firstPage = 1;
    }
    if (this.firstPage > 99 || this.endPage > 99) {
      this.firstPage = this.firstPage + 2;
    }
    if (this.firstPage > 999 || this.endPage > 999) {
      this.firstPage = this.firstPage + 1;
    }
    if (this.firstPage > 9999 || this.endPage > 9999) {
      this.firstPage = this.activePage;
    }
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = [];
    this.arrayPage = arrd;
    this.emitPage();
  }

  /*Нажатие на кнеопку для вывода первой страницы*/
  pageButtonFirst() {
    const sum: number = Math.ceil(this.countRows / this.rows);
    this.activePage = 1;
    this.firstPage = 1;
    if (sum > 5) {
      this.endPage = 5;
    }
    else {
      this.endPage = sum;
    }
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = [];
    this.arrayPage = arrd;
    this.emitPage();
  }

  /*Отправка измения страниц в главный модуль*/
  emitPage() {
    this.pageUpt.emit({page: this.activePage});
  }

  /*Изменение Квывода количества строк*/
  updateRows(event) {
    this.rows = Number(event.target.value);
    this.ngOnInit();
    this.rowsUpt.emit({rows: event.target.value});
  }
}
