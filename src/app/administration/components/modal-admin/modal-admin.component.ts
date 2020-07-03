import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {pipe} from 'rxjs';
import {ValidatorAdministration} from '../../validators/validator-administration';

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
    const now = this.today();
    this.couponForm = new FormGroup({
      couponPublication: new FormControl(''),
      couponCode: new FormControl('', [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100)]),
      couponType: new FormControl('percent'),
      couponValue: new FormControl('', [Validators.required]),
      couponDateStart: new FormControl(now),
      couponDateEnd: new FormControl(now),
      couponClient: new FormControl(''),
      couponFinish: new FormControl('')
    });
  }

  /*Функция вычисления сегодняшенго дня*/
  today() {
    const all = new Date();
    const year = all.getFullYear();
    let mounth = (all.getMonth() + 1).toString();
    if (mounth.length === 1) {
      mounth = 0 + mounth;
    }
    let day = (all.getDate()).toString();
    if (day.length === 1) {
      day = 0 + day;
    }
    return year + '-' + mounth + '-' + day;
  }

  couponSubmit() {
    console.log('Form: ', this.couponForm);
  }

}
