import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
  ctrl: boolean = false;

  @Input() arrTable: object[];

  @Output() sortOutput: EventEmitter<object> = new EventEmitter<object>();
  @Output() clickBut: EventEmitter<number[]> = new EventEmitter<number[]>();


  /*Заглавие всех столбцов*/
  ElementsSort: HTMLCollectionOf<Element> = document.getElementsByClassName('itemSort');




  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/administration/options/coupons') {
      this.activeURL = 'coupon';
    }

    if (this.router.url === '/administration/category/category') {
      this.activeURL = 'category';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes: ', changes);
    if (this.router.url === '/administration/options/coupons') {
      console.log('changes1: ', changes);
      this.loaderTable = true;
      const changeData = changes['arrTable'];
      console.log('changeData');
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
    if (this.router.url === '/administration/category/category') {
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
    console.log(event.path);
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
    console.log(this.column);
    console.log(this.columnValue);
    this.sortOutput.emit({sort: {sortName: this.column, sortValue: this.columnValue}});
  }

  EditTable(id) {
    console.log(id);
    if (this.ctrl) {
      if (this.arrEditor.includes(id)) {
        this.arrEditor = this.arrEditor.filter(item => item !== id);
        this.clickBut.emit(this.arrEditor);
      } else {
        this.arrEditor.push(id);
        this.clickBut.emit(this.arrEditor);
      }
    }
    else {
      this.arrEditor = [];
      this.arrEditor.push(id);
      this.clickBut.emit(this.arrEditor);
    }
  }

  EditTableDouble(id) {
    this.ctrl = false;
    this.arrEditor = [];
    this.arrEditor.push(id);
    this.clickBut.emit(this.arrEditor);
  }

  @HostListener('document:keydown.control', ['$event']) ctrlDown(ev: MouseEvent) {
    this.ctrl = ev.ctrlKey;
  }

  @HostListener('document:keyup.control', ['$event']) ctrlUp(ev: MouseEvent) {
    this.ctrl = ev.ctrlKey;
  }

}
