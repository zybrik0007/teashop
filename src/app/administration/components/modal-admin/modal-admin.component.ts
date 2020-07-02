import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit {

  nameHead: string = 'Добавить купон';

  couponForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      couponPublication: new FormControl(''),
      couponCode: new FormControl(''),
      couponType: new FormControl(''),
      couponValue: new FormControl(''),
      couponDateStart: new FormControl(''),
      couponDateEnd: new FormControl(''),
      couponClient: new FormControl(''),
      couponFinish: new FormControl('')
    });
  }

  couponSubmit() {
    console.log('Form: ', this.couponForm);
  }

}
