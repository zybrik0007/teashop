import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent implements OnInit, OnChanges {

  column: string = 'id';
  columnValue: string = 'ASC';
  activeURL: string;
  endItem: boolean;
  loaderTable: boolean = false;
  arrEditor: number[] = [];

  @Input() arrTable: object[];

  @Output() sortOutput: EventEmitter<object> = new EventEmitter<object>();


  /*Заглавие всех столбцов*/
  ElementsSort: HTMLCollectionOf<Element> = document.getElementsByClassName('itemSort');


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/administration/options/coupons') {
      this.activeURL = 'coupon';
      console.log('arrTable Table ngOnInit: ', this.arrTable);
      console.log('this.endItem ngOnInit:', this.endItem);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.router.url === '/administration/options/coupons') {
      this.loaderTable = true;
      const changeData = changes['arrTable'];
      const arrChangesData = changeData['currentValue'];
      const endArr = arrChangesData.pop();
      if (endArr['count'] === 0) {
        this.endItem = true;
        this.ngOnInit();
      }
      else {
        this.endItem = false;
        this.arrTable = arrChangesData;
        this.ngOnInit();
      }
    }
  }

  sortUpt(event) {
    const arr = event.path;
    for (const value of arr) {
      if (value.className === 'itemSort') {
        const sortd = value.dataset['sort'];
        const valued = value.dataset['val'];
        for (const elem of Object(this.ElementsSort)) {
          elem.dataset.val = '';
        }
        this.column = sortd;
        if (valued === '' || valued === 'DESC') {
          value.dataset['val'] = 'ASC';
          this.columnValue = 'ASC';
        } else {
          value.dataset['val'] = 'DESC';
          this.columnValue = 'DESC';
        }
      }
    }
    this.sortOutput.emit({sort: {sortName: this.column, sortValue: this.columnValue}});
  }

  EditTable(event) {
    console.log(event);
  }
}
