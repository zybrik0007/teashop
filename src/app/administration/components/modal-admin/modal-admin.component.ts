import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, pipe, fromEvent} from 'rxjs';




import {ValidatorAdministration} from '../../validators/validator-administration';
import {
  CouponPostIdInterface,
  CouponPostInterface,
  CouponsPutInterface
} from '../../interfaces/requests/options/requests.coupons.interface';
import {PaymentPutInterface} from '../../interfaces/requests/options/requests.payment.interface';
import {DeliveryPutInterface} from '../../interfaces/requests/options/requests.delivery.interface';
import {PricePutInterface} from '../../interfaces/requests/options/requests.price.interface';
import {StatusPutInterface} from '../../interfaces/requests/options/requests.status.interface';
import {GroupPutInterface} from '../../interfaces/requests/options/requests.groups.interface';
import {Router} from '@angular/router';
import {CouponsService} from '../../services/requests/options/coupons.service';
import {CategoryPutInterface} from '../../interfaces/requests/category/requests.category.interface';
import {CategoryService } from '../../services/requests/сategory/category.service';
import {IdInterface} from '../../interfaces/general/id.interface';


@Component({
  selector: 'app-modal-admin',
  templateUrl: './modal-admin.component.html',
  styleUrls: ['./modal-admin.component.scss']
})
export class ModalAdminComponent implements OnInit, OnChanges {


  @Input() modalNameChild: string;
  @Input() rowId: number;
  @Input() rowArr: number[];
  @Output() closeModal: EventEmitter<object> = new EventEmitter<object>();
  @Output() closeModalFalse: EventEmitter<object> = new EventEmitter<object>();
  @Output() error: EventEmitter<object> = new EventEmitter<object>();
  @Output() expend: EventEmitter<any> = new EventEmitter<any>();
  @Output() expendEdit: EventEmitter<string> = new EventEmitter<string>();
  nameHead: string; /*Название заглавия модального окна*/
  modal: string; /*Определение какое модальное окно активруется.*/
  but: string; /*Определение кнопки Submit*/
  pseudonym: string; /*Значение для поля Псевдоним*/
  timeItem: any; /*Тамут для заполнения поля Псевдоним*/
  loader: boolean = false;
  errorAr: boolean = true;
  errorText: string = '';
  requestId: IdInterface;
  fileImage1: any = '';
  image1: any = '';
  CategoryDisplayImage: boolean = false;
  server: string = 'http://172.17.1.10:4200';


  couponPut: CouponsPutInterface; /*Определение перемнной для модального окна Купоны*/
  paymentPut: PaymentPutInterface; /*Определение перемнной для модального окна Способ оплаты*/
  deliveryPut: DeliveryPutInterface; /*Определение перемнной для модального окна Способ доставки*/
  pricePut: PricePutInterface; /*Определение перемнной для модального окна Цена на доставку*/
  statusPut: StatusPutInterface; /*Определение перемнной для модального окна Статус заказа*/
  groupPut: GroupPutInterface; /*Определение перемнной для модального окна Группа пользователей*/
  categoryPut: CategoryPutInterface; /*Определение перемнной для модального окна Категория*/

  couponForm: FormGroup; /*Форма Купоны*/
  paymentForm: FormGroup; /*Форма Способы оплаты*/
  deliveryForm: FormGroup; /*Форма Способы доставки*/
  priceForm: FormGroup; /*Форма Цены доставки*/
  statusForm: FormGroup; /*Форма статуса заказа*/
  groupForm: FormGroup; /*Форма группа пользователей*/
  categoryForm: FormGroup; /*Форма категорий*/


  constructor(
    private couponsService: CouponsService,
    private categoryService: CategoryService
  ) {
  }

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
        couponClient: new FormControl(this.couponPut.client, [ValidatorAdministration.inbreed]),
        couponFinish: new FormControl(this.couponPut.finish)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания способа оплаты*/
    if (this.modal === 'payment') {
      this.paymentForm = new FormGroup({
        paymentPublication: new FormControl(this.paymentPut.publication),
        paymentType: new FormControl(this.paymentPut.type),
        paymentCode: new FormControl(this.paymentPut.code, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100),
          ValidatorAdministration.code]),
        paymentName: new FormControl(this.paymentPut.name, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100)]),
        paymentSort: new FormControl(this.paymentPut.sort, [Validators.required, ValidatorAdministration.inbreed]),
        paymentDescription: new FormControl(this.paymentPut.description)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания способа доставки*/
    if (this.modal === 'delivery') {
      this.deliveryForm = new FormGroup({
        deliveryPublication: new FormControl(this.deliveryPut.publication),
        deliveryPayment: new FormControl(this.deliveryPut.payment, [Validators.required, ValidatorAdministration.arrType]),
        deliveryCode: new FormControl(this.deliveryPut.code, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100),
          ValidatorAdministration.code]),
        deliveryName: new FormControl(this.deliveryPut.name, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100)]),
        deliverySort: new FormControl(this.deliveryPut.sort, [Validators.required, ValidatorAdministration.inbreed]),
        deliveryDescription: new FormControl(this.deliveryPut.description)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания цены доставки*/
    if (this.modal === 'price') {
      this.priceForm = new FormGroup({
        priceName: new FormControl(this.pricePut.name, [Validators.required]),
        pricePrice: new FormControl(this.pricePut.price, [Validators.required])
      });
    }

    /*Инициализвция модального окна добавления, редактирвания статуса заказа*/
    if (this.modal === 'status') {
      this.statusForm = new FormGroup({
        statusName: new FormControl(this.statusPut.name, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100)]),
        statusCode: new FormControl(this.statusPut.code, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100),
          ValidatorAdministration.code])
      });
    }

    /*Инициализвция модального окна добавления, редактирвания статуса заказа*/
    if (this.modal === 'group') {
      this.groupForm = new FormGroup({
        groupDefault: new FormControl(this.groupPut.default),
        groupName: new FormControl(this.groupPut.name, [Validators.required, ValidatorAdministration.trim, Validators.maxLength(100)]),
        groupDiscount: new FormControl(this.groupPut.discount, [Validators.required, ValidatorAdministration.percent]),
        groupDescription: new FormControl(this.groupPut.description)
      });
    }

    /*Инициализвция модального окна добавления, редактирвания категории*/
    if (this.modal === 'category') {
      this.categoryForm = new FormGroup({
        categoryImage: new FormControl(this.categoryPut.image),
        categoryName: new FormControl(this.categoryPut.name, [Validators.required]),
        categoryNick: new FormControl(this.categoryPut.nickname, [Validators.required]),
        categoryPublication: new FormControl(this.categoryPut.publication),
        categorySort: new FormControl(this.categoryPut.sort, [Validators.required, ValidatorAdministration.inbreed]),
        categoryMetaTitle: new FormControl(this.categoryPut.METAtitle),
        categoryMetaDescription: new FormControl(this.categoryPut.METAdescription),
        categoryMetaKeywords: new FormControl(this.categoryPut.METAkeywords),
        categoryShort: new FormControl(this.categoryPut.short),
        categoryDescription: new FormControl(this.categoryPut.description)
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    /*Определение изменений, при создании или редактирование*/
    const dataChangeModal = changes['modalNameChild'];
    console.log('dataChangeModalanguar inout file: ', dataChangeModal);
    console.log('changes: ', changes);

    /*Определение значений при открытии на добавления Купона*/
    if (dataChangeModal['currentValue'] === 'add-coupon') {
      this.modal = 'coupon';
      this.nameHead = 'Добавить купон';
      this.but = 'add';
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

    /*Определение значение при открыти на редактирование Купона*/
    if (dataChangeModal['currentValue'] === 'edit-coupon') {
      const dataId = changes['rowId'];
      let editParams: object = {};
      console.log('dataId: ', dataId);
      this.requestId = {
        id: dataId['currentValue']
      };
      this.couponsService.postIdCouponsService(this.requestId)
        .subscribe(
          res => {
            if (res['status'] === 200) {
              const resBody = res['body'];
              const resParse = JSON.parse(resBody['response']);
              editParams = resParse;
              const startDate = resParse['startDate'].substr(0, 10);
              const endDate = resParse['endDate'].substr(0, 10);
              this.couponPut = {
                publication: resParse['publication'],
                code: resParse['code'],
                type: resParse['type'],
                value: resParse['value'],
                dateStart: startDate,
                dateEnd: endDate,
                client: resParse['clientId'],
                finish: resParse['finish']
              };
              this.modal = 'coupon';
              this.nameHead = 'Редактировать купон';
              this.but = 'edit';
              this.ngOnInit();
              console.log('this.couponPut: ', this.couponPut);
            } else {
              this.error.emit({error: 'Ошибка сервера или отсутствует выделенная строка для редактирвоания'});
            }
          },
          error => {
            if (error['status'] === 500 || error['status'] === 501) {
              const textEr = error['error'];
              this.error.emit({error: textEr['error']});
            } else {
              this.error.emit({error: 'Ошибка сервера или отсутствует выделенная строка для редактирвоания'});
            }
          }
        );
    }

    /*Определение значение при открыти на удаление Купона*/

    /*Определение значений при открытии на добавления  Способа оплаты*/

    if (dataChangeModal['currentValue'] === 'add-payment') {
      this.modal = 'payment';
      this.nameHead = 'Добавить cпособ оплаты';
      this.but = 'add';
      this.paymentPut = {
        publication: false,
        type: 'cash',
        code: '',
        name: '',
        sort: null,
        description: ''
      };
    }

    /*Определение значений при открытии на добавления  Способа доставки*/
    if (dataChangeModal['currentValue'] === 'add-delivery') {
      this.modal = 'delivery';
      this.nameHead = 'Добавить cпособ доставки';
      this.but = 'add';
      this.deliveryPut = {
        publication: false,
        payment: [''],
        code: '',
        name: '',
        sort: null,
        description: ''
      };
    }

    /*Определение значений при открытии на добавления Цены на доставку*/
    if (dataChangeModal['currentValue'] === 'add-price') {
      this.modal = 'price';
      this.nameHead = 'Добавить цену доставки';
      this.but = 'add';
      this.pricePut = {
        name: '',
        price: null
      };
    }

    /*Определение значений при открытии на добавления  Статуса заказа*/
    if (dataChangeModal['currentValue'] === 'add-status') {
      this.modal = 'status';
      this.nameHead = 'Добавить статус заказа';
      this.but = 'add';
      this.statusPut = {
        name: '',
        code: ''
      };
    }

    /*Определение значений при открытии на добавления Группы пользователей*/
    if (dataChangeModal['currentValue'] === 'add-group') {
      this.modal = 'group';
      this.nameHead = 'Добавить группу пользователей';
      this.but = 'add';
      this.groupPut = {
        default: false,
        name: '',
        discount: null,
        description: ''
      };
    }

    /*Определение значений при открытии на добавления Категории*/
    if (dataChangeModal['currentValue'] === 'add-category') {
      this.modal = 'category';
      this.nameHead = 'Добавить категорию';
      this.but = 'add';
      this.categoryPut = {
        image: '',
        name: '',
        nickname: '',
        publication: false,
        sort: null,
        METAtitle: '',
        METAdescription: '',
        METAkeywords: '',
        short: '',
        description: ''
      };
    }

    /*Определение значение при открыти на редактирование Категории*/
    if (dataChangeModal['currentValue'] === 'edit-category') {
      const dataId = changes['rowId'];
      let editParams: object = {};
      this.requestId = {
        id: dataId['currentValue']
      };
      this.categoryService.postIdCategoryService(this.requestId)
        .subscribe(
          res => {
            if (res['status'] === 200) {
              const resBody = res['body'];
              const resParse = JSON.parse(resBody['response']);
              editParams = resParse;
              this.categoryPut = {
                name: resParse['name'],
                nickname: resParse['nickname'],
                sort: resParse['sort'],
                description: resParse['description'],
                short: resParse['short_description'],
                METAtitle: resParse['meta_title'],
                METAdescription: resParse['meta_description'],
                METAkeywords: resParse['meta_keywords'],
                publication: resParse['publication'],
              };
              if (resParse.image === 'file') {
                this.fileImage1 = this.server + '/image/category/' + resParse['id'] + '/big.jpg';
                this.image1 = this.server + '/image/category/' + resParse['id'] + '/big.jpg';
              }
              console.log('111:', this.server + '/image/category/' + resParse['id'] + '/big.jpg');
              console.log('this.categoryPut.image', this.categoryPut.image);
              this.modal = 'category';
              this.nameHead = 'Редактировать категорию';
              this.but = 'edit';
              this.ngOnInit();
              console.log('this.categoryPut: ', this.categoryPut);
            } else {
              this.error.emit({error: 'Ошибка сервера или отсутствует выделенная строка для редактирвоания'});
            }
            },
          error => {
            if (error['status'] === 500 || error['status'] === 501) {
              const textEr = error['error'];
              this.error.emit({error: textEr['error']});
            } else {
              this.error.emit({error: 'Ошибка сервера или отсутствует выделенная строка для редактирвоания'});
            }
          }
        );
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
  FormSubmit(event) {
    if (event === 'coupon') {
      const formValueCoupon: object = this.couponForm['value'];
      if (this.but === 'add') {
        this.loader = true;
        const requestPutCoupon: CouponsPutInterface = {
          publication: formValueCoupon['couponPublication'],
          code: formValueCoupon['couponCode'],
          type: formValueCoupon['couponType'],
          value: formValueCoupon['couponValue'],
          dateStart: formValueCoupon['couponDateStart'],
          dateEnd: formValueCoupon['couponDateEnd'],
          client: formValueCoupon['couponClient'],
          finish: formValueCoupon['couponFinish'],
        };
        this.couponsService.putCouponsService(requestPutCoupon)
          .subscribe(
            res => {
              if (res['status'] === 200) {
                this.modalTrue();
              } else {
                this.error.emit({error: 'Неизвестная ошибка сервера'});
              }
            },
            error => {
              console.log(error);
              if (error['status'] === 500 || error['status'] === 501) {
                const textEr = error['error'];
                this.error.emit({error: textEr['error']});
              } else {
                this.error.emit({error: 'Неизвестная ошибка сервера'});
              }
            }
          );
        this.loader = false;
      }
      if (this.but === 'edit') {
        this.loader = true;
        const requestPostCoupon: CouponPostInterface = {
          id: this.requestId.id,
          publication: formValueCoupon['couponPublication'],
          code: formValueCoupon['couponCode'],
          type: formValueCoupon['couponType'],
          value: formValueCoupon['couponValue'],
          dateStart: formValueCoupon['couponDateStart'],
          dateEnd: formValueCoupon['couponDateEnd'],
          client: formValueCoupon['couponClient'],
          finish: formValueCoupon['couponFinish'],
        };
        console.log('requestPostCoupon: ', requestPostCoupon);
        this.couponsService.postCouponService(requestPostCoupon)
          .subscribe(
            res => {
              if (res['status'] === 200) {
                this.modalTrue();
              } else {
                this.error.emit({error: 'Неизвестная ошибка сервера'});
              }
            },
            error => {
              if (error['status'] === 500 || error['status'] === 501) {
                const textEr = error['error'];
                this.error.emit({error: textEr['error']});
              } else {
                this.error.emit({error: 'Неизвестная ошибка сервера'});
              }
            }
          );
        this.loader = false;
      }
    }
    if (event === 'payment') {
      console.log('Form Payment: ', this.paymentForm);
    }
    if (event === 'delivery') {
      console.log('Form Delivery: ', this.deliveryForm);
    }
    if (event === 'price') {
      console.log('Form Price: ', this.priceForm);
    }
    if (event === 'status') {
      console.log('Form Status: ', this.statusForm);
    }
    if (event === 'category') {
      if (this.but === 'add') {
        this.loader = true;
        const formDataCategoryAdd = new FormData();
        const formValueCategory: object = this.categoryForm['value'];
        formDataCategoryAdd.append('image', this.fileImage1);
        formDataCategoryAdd.append('name', formValueCategory['categoryName']);
        formDataCategoryAdd.append('nickname', formValueCategory['categoryNick']);
        formDataCategoryAdd.append('publication', formValueCategory['categoryPublication']);
        formDataCategoryAdd.append('sort', formValueCategory['categorySort']);
        formDataCategoryAdd.append('metaTitle', formValueCategory['categoryMetaTitle']);
        formDataCategoryAdd.append('metaDescription', formValueCategory['categoryMetaDescription']);
        formDataCategoryAdd.append('metaKeywords', formValueCategory['categoryMetaKeywords']);
        formDataCategoryAdd.append('short', formValueCategory['categoryShort']);
        formDataCategoryAdd.append('description', formValueCategory['categoryDescription']);
        this.categoryService.putCategoryService(formDataCategoryAdd)
          .subscribe(res => {
            if (res['status'] === 200) {
              this.modalTrue();
            } else {
              this.error.emit({error: 'Неизвестная ошибка сервера'});
            }
          }, error => {
            if (error['status'] === 500 || error['status'] === 501) {
              const textEr = error['error'];
              this.error.emit({error: textEr['error']});
            } else {
              this.error.emit({error: 'Неизвестная ошибка сервера'});
            }
          });
        this.loader = false;
      }
    }
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
        ['з', 'z'], ['и', 'i'], ['й', 'j'], ['к', 'k'], ['л', 'l'], ['м', 'm'],
        ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'], ['с', 's'], ['т', 't'],
        ['у', 'u'], ['ф', 'f'], ['х', 'x'], ['ь', ''], ['a', 'a'], ['b', 'b'],
        ['c', 'c'], ['c', 'c'], ['d', 'd'], ['e', 'e'], ['f', 'f'], ['g', 'g'],
        ['h', 'h'], ['i', 'i'], ['j', 'j'], ['k', 'k'], ['l', 'l'], ['m', 'm'],
        ['n', 'n'], ['o', 'o'], ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'],
        ['t', 't'], ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
        ['z', 'z'], ['1', '1'], ['2', '2'], ['3', '4'], ['4', '4'], ['5', '5'],
        ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'], ['0', '0']];
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


  /*Функция вызываемы, при закртиые модального окна, после положительного результата запроса*/
  modalTrue() {
    this.closeModal.emit({});
  }

  modalFalse() {
    this.closeModalFalse.emit({});
  }

  imageCategoryLoad(event) {
    console.log('event TOOO');
    if (event.target.files.length > 0) {
      this.fileImage1 = event.target.files[0];
      this.imageRead(event.target.files[0]);
      this.CategoryDisplayImage = true;
    }
  }



  imageRead(event) {
    const readerFile = new FileReader();
    readerFile.onload = (e) => {
      this.image1 = e.target.result;
    };
    readerFile.readAsDataURL(event);
  }
  ExpendImage() {
    this.expend.emit(this.fileImage1);
  }
  ExpendImageEdit() {
    console.log('ExpendImageEdit');
    this.expendEdit.emit(this.image1);
  }
  deleteExpand(event: number) {
    console.log('33333');
    if (event === 1) {
      console.log('1');
      this.image1 = '';
      console.log('2');
      this.fileImage1 = '';
      console.log('3');
    }
    console.log('4');
  }
}
