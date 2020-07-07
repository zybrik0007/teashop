import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-buttons-admin',
  templateUrl: './buttons-admin.component.html',
  styleUrls: ['./buttons-admin.component.scss']
})
export class ButtonsAdminComponent implements OnInit {

  @Output() searchUpt: EventEmitter<object> = new EventEmitter<object>();
  @Output() add: EventEmitter<object> = new EventEmitter<object>();
  timeItem: any;
  timeOut(event) {
    this.timeItem = setTimeout(() => {
      this.searchUpt.emit({search: event});
    }, 2000);
  }

  timeClear() {
    clearTimeout(this.timeItem);
  }

  constructor() { }

  ngOnInit(): void {
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

}
