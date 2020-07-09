import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {pipe} from 'rxjs';


import {ValidatorAdministration} from '../../validators/validator-administration';
import {CouponsPutInterface} from '../../interfaces/requests/options/requests.coupons.interface';
import {PaymentPutInterface} from '../../interfaces/requests/options/requests.payment.interface';
import {DeliveryPutInterface} from '../../interfaces/requests/options/requests.delivery.interface';
import {PricePutInterface} from '../../interfaces/requests/options/requests.price.interface';

@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit, OnChanges {

  @Input()modalNameChild: string;
  nameHead: string; /*Название заглавия модального окна*/
  modal: string; /*Определение какое модальное окно активруется.*/
  pseudonym: string; /*Значение для поля Псевдоним*/
  timeItem: any; /*Тамут для заполнения поля Псевдоним*/


  couponPut: CouponsPutInterface; /*Определение премнной для модального окна Купоны*/
  paymentPut: PaymentPutInterface; /*Определение премнной для модального окна Способ оплаты*/
  deliveryPut: DeliveryPutInterface; /*Определение премнной для модального окна Способ доставки*/
  pricePut: PricePutInterface; /*Определение премнной для модального окна Цена на доставку*/

  couponForm: FormGroup; /*Форма Купоны*/
  paymentForm: FormGroup; /*Форма Способы оплаты*/
  deliveryForm: FormGroup; /*Форма Способы доставки*/
  priceForm: FormGroup; /*Форма Цены доставки*/

  constructor() { }

  ngOnInit(): void {
    /*Инициализвция модального окна добавления, редактирвания купона*/
    if (this.modal === 'coupon') {
      this.couponForm = new FormGroup({
        couponPublication: new FormControl(this.couponPut.publication),
        couponCode: new FormControl(this.couponPut.code, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100),
          ValidatorAdministration.code]),
        couponType: new FormControl(this.couponPut.type),
        couponValue: new FormControl(this.couponPut.value, [Validators.required]),
        couponDateStart: new FormControl(this.couponPut.dateStart, [Validators.required]),
        couponDateEnd: new FormControl(this.couponPut.dateEnd, [Validators.required]),
        couponClient: new FormControl(this.couponPut.client),
        couponFinish: new FormControl(this.couponPut.finish)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания способа оплаты*/
    if (this.modal === 'payment') {
      this.paymentForm = new FormGroup({
        paymentPublication: new FormControl(this.paymentPut.publication),
        paymentType: new FormControl(this.paymentPut.type),
        paymentCode: new FormControl(this.paymentPut.code),
        paymentName: new FormControl(this.paymentPut.name),
        paymentPseudonym: new FormControl(this.paymentPut.pseudonym),
        paymentDescription: new FormControl(this.paymentPut.description)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания способа доставки*/
    if (this.modal === 'delivery') {
      this.deliveryForm = new FormGroup({
        deliveryPublication: new FormControl(this.deliveryPut.publication),
        deliveryName: new FormControl(this.deliveryPut.name),
        deliveryPseudonym: new FormControl(this.deliveryPut.pseudonym),
        deliveryPayment: new FormControl(this.deliveryPut.payment),
        deliveryDescription: new FormControl(this.deliveryPut.description)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания цены доставки*/
    if (this.modal === 'price') {
      this.priceForm = new FormGroup({
        priceName: new FormControl(this.pricePut.name),
        pricePrice: new FormControl(this.pricePut.price)
      });
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    /*Определение изменений, при создании или редактирование*/
    const dataChangeModal = changes['modalNameChild'];

    /*Определение значений при открытии на редактирование или добавления Купона*/
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

    /*Определение значений при открытии на редактирование или добавления Способа оплаты*/
    if (dataChangeModal['currentValue'] === 'add-payment') {
      this.modal = 'payment';
      this.nameHead = 'Добавить cпособ оплаты';
      this.paymentPut = {
        publication: false,
        type: 'cash',
        code: '',
        name: '',
        pseudonym: '',
        description: ''
      };
    }

    /*Определение значений при открытии на редактирование или добавления Способа доставки*/
    if (dataChangeModal['currentValue'] === 'add-delivery') {
      this.modal = 'delivery';
      this.nameHead = 'Добавить cпособ оплаты';
      this.deliveryPut = {
        publication: false,
        name: '',
        pseudonym: '',
        sort: null,
        payment: [''],
        description: ''
      };
    }

    /*Определение значений при открытии на редактирование или добавления Цены на доставку*/
    if (dataChangeModal['currentValue'] === 'add-price') {
      this.modal = 'price';
      this.nameHead = 'Добавить цену доставки';
      this.pricePut = {
        name: '',
        price: null
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

  /*Отправка формы*/
  couponSubmit() {
    console.log('Form: ', this.couponForm);
  }

  /*Функция таймаута для заполения Псевдонима на основании имени*/
  timeOut(event) {
    this.timeItem = setTimeout(() => {
      const lowerCase = event.toLowerCase();
      const data = lowerCase.replace(/\s+/g, '');
      const dataArr = data.split('');
      let dataRes: string = '';
      const arr = [
        ['щ', 'shh'], ['ш', 'sh'], ['ч', 'ch'], ['ц', 'cz'], ['ю', 'yu'],
        ['я', 'ya'], ['ё', 'yo'], ['ж', 'zh'], ['ъ', ''], ['ы', 'y'], ['э', 'e'],
        ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'], ['д', 'd'], ['е', 'e'],
        ['з', 'z'], ['и' , 'i'], ['й', 'j'], ['к', 'k'], ['л', 'l'], ['м', 'm'],
        ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'],
        ['у', 'u'], ['ф', 'f'], ['х', 'x'], ['ь', ''], ['a', 'a'], ['b', 'b'],
        ['c', 'c'], ['c', 'c'], ['d', 'd'], ['e', 'e'], ['f', 'f'], ['g', 'g'],
        ['h', 'h'], ['i', 'i'], ['j', 'j'], ['k', 'k'], ['l', 'l'], ['m', 'm'],
        ['n', 'n'], ['o', 'o'], ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'],
        ['t', 't'], ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
        ['z', 'z'], ['1', '1'], ['2', '2'], ['3', '4'], ['4', '4'], ['5', '5'],
        ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'],  ['0', '0']];
      for (const elem of dataArr) {
        for (let i = 0; i < arr.length; i++) {
          if (elem === arr[i][0]) {
            dataRes = dataRes + arr[i][1];
          }
        }
      }
      this.pseudonym = dataRes;
      }, 1000);
  }

  /*Очищение таймаута функции для заполения Псевдонима на основании имени*/
  timeClear() {
    clearTimeout(this.timeItem);
  }
  /*Функция транслита псевдонима на основании значения имени*/
  translit(event) {
    this.timeClear();
    this.timeOut(event.target.value);
  }



}
