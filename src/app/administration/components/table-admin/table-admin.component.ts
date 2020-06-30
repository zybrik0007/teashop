import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.scss']
})
export class TableAdminComponent implements OnInit {

  column: string = 'id';
  columnValue: string = 'ASC';

  @Output() sortOutput: EventEmitter<object> = new EventEmitter<object>();


  /*Заглавие всех столбцов*/
  ElementsSort: HTMLCollectionOf<Element> = document.getElementsByClassName('itemSort');


  constructor() { }

  ngOnInit(): void {
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
}
