import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {pipe} from 'rxjs';


import {ValidatorAdministration} from '../../validators/validator-administration';
import {CouponsPutInterface} from '../../interfaces/requests/options/requests.coupons.interface';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit, OnChanges {

  @Input()modalNameChild: string;
  nameHead: string;
  modal: string;
  couponPut: CouponsPutInterface;
  couponForm: FormGroup;
  paymentForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const now = this.today();
    this.couponForm = new FormGroup({
      couponPublication: new FormControl(this.couponPut.publication),
      couponCode: new FormControl(this.couponPut.code, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100), ValidatorAdministration.code]),
      couponType: new FormControl(this.couponPut.type),
      couponValue: new FormControl(this.couponPut.value, [Validators.required]),
      couponDateStart: new FormControl(this.couponPut.dateStart, [Validators.required]),
      couponDateEnd: new FormControl(this.couponPut.dateEnd, [Validators.required]),
      couponClient: new FormControl(this.couponPut.client),
      couponFinish: new FormControl(this.couponPut.finish)
    });
    this.paymentForm = new FormGroup({
      paymentPublication: new FormControl(''),
      paymentType: new FormControl(''),
      paymentCode: new FormControl(''),
      paymentName: new FormControl(''),
      paymentpseudonym: new FormControl(''),
      paymentDescription: new FormControl('')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('modal test');
    const dataChangeModal = changes['modalNameChild'];
    console.log('dataChange', changes);
    if (dataChangeModal['currentValue'] === 'add-coupon') {
      this.modal = 'coupon';
      this.nameHead = 'Добавить купон';
      this.couponPut = {
        publication: false,
        code: '',
        type: 'percent',
        value: null,
        dateStart: '',
        dateEnd: '',
        client: null,
        finish: false
      };


    }
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

  translit(event) {
    const lowerCase = event.toLowerCase();
    const data = lowerCase.replace(/\s+/g, '');
    const dataArr = data.split('');
    let dataRes: string = '';
    const arr = [
      ['щ', 'shh'], ['ш', 'sh'], ['ч', 'ch'], ['ц', 'cz'], ['ю', 'yu'], ['я', 'ya'], ['ё', 'yo'], ['ж', 'zh'], ['ъ', ''], ['ы', 'y'], ['э', 'e'], ['а', 'a'],
      ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'], ['з', 'z'], ['и' , 'i'], ['й', 'j'], ['к', 'k'], ['л', 'l'], ['м', 'm'], ['н', 'n'], ['о', 'o'],
      ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'], ['х', 'x'], ['ь', '']];
    for (const elem of dataArr) {
      for (let i = 0; i < arr.length; i++) {
        if (elem === arr[i][0]) {
          dataRes = dataRes + arr[i][1];
        }
      }
    }

  }



}
