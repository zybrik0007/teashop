import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-buttons-admin',
  templateUrl: './buttons-admin.component.html',
  styleUrls: ['./buttons-admin.component.scss']
})
export class ButtonsAdminComponent implements OnInit, OnChanges {

  constructor() { }


  EditButtonActive: boolean = false;
  DeleteButtonActive: boolean = false;

  @Input() arrRowsActive: number;
  @Output() searchUpt: EventEmitter<object> = new EventEmitter<object>();
  @Output() add: EventEmitter<object> = new EventEmitter<object>();
  @Output() edit: EventEmitter<object> = new EventEmitter<object>();
  timeItem: any;

  timeOut(event) {
    this.timeItem = setTimeout(() => {
      this.searchUpt.emit({search: event});
    }, 2000);
  }

  timeClear() {
    clearTimeout(this.timeItem);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('butChange:', changes);
    console.log('arrRowsActive:', this.arrRowsActive);
    const change = changes['arrRowsActive'];
    const countRows = change['currentValue'];
    if (countRows === 1) {
      this.EditButtonActive = true;
      this.DeleteButtonActive = true;
    }
    else if (countRows >= 1) {
      this.EditButtonActive = false;
      this.DeleteButtonActive = true;
    } else {
      this.EditButtonActive = false;
      this.DeleteButtonActive = false;
    }
  }

  searchSort(event) {
    this.timeClear();
    if (event.target.value.trim() !== '' || event.target.value === '') {
      this.timeOut(event.target.value);
    }
  }

  addItem() {
    this.add.emit();
  }

  editItem() {
    if (this.arrRowsActive === 1) {
      this.edit.emit();
    }
  }

}
