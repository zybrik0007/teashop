import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.scss']
})
export class FooterAdminComponent implements OnInit {

  @Input() countRows: number;
  @Input() rows: number;

  firstPage: number;
  endPage: number;
  activePage: number;
  arrayPage: number[];
  pageDis: boolean;

  constructor(
    el: ElementRef,
    r: Renderer2
  ) {
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.FirstPageDisplay(this.countRows, this.rows);
  }

  FirstPageDisplay(countd, strd) {
    const sum: number = Math.ceil(countd / strd);
    this.pageDis = sum > 1;
    this.firstPage = 1;
    this.endPage = (sum > 5) ? 5 : sum;
    this.activePage = this.firstPage;
    const arrd = [];
    for (let i = this.firstPage; i <= this.endPage; i++) {
      arrd.push(i);
    }
    this.arrayPage = arrd;
    const ac = document.getElementsByClassName('page');
    this.activePage = 1;
  }

  UpdatePageDisplay(clickItem) {
    const sum: number = Math.ceil(this.countRows / this.rows);
    const arrd = [];
    //console.log('Upt event', clickItem);
    //console.log('Upt firstPage', this.firstPage);
    //console.log('Upt endPage', this.endPage);
    //console.log('Upt activePage', this.activePage);

    if (clickItem === this.endPage && clickItem !== sum) {
      this.firstPage = clickItem;
      this.endPage = this.firstPage + 4;
      if (this.endPage > sum) {
        this.endPage = sum;
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
    //console.log('Upt after firstPage', this.firstPage);
    //console.log('Upt  after endPage', this.endPage);
    //console.log('Upt  after activePage', this.activePage);
  }

  UpdatePage(event) {
    const clickItem = Number(event.target.innerText);
    this.UpdatePageDisplay(clickItem);
  }

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

  }
  pageButtomMinus() {
    const sum: number = Math.ceil(this.countRows / this.rows);
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
        if (sum > 5) {
          this.endPage = 5;
        }
        else {
          this.endPage = sum;
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
  }
  pageButtonEnd() {
    const sum: number = Math.ceil(this.countRows / this.rows);
    this.activePage = this.endPage = sum;
    this.firstPage = sum - 4;
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
  }
  pageButtonFirst() {
    console.log('Upt firstPage', this.firstPage);
    console.log('Upt  endPage', this.endPage);
    console.log('Upt  activePage', this.activePage);
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
    console.log('Upt after firstPage', this.firstPage);
    console.log('Upt after endPage', this.endPage);
    console.log('Upt after  activePage', this.activePage);

  }
}
