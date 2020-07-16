import {FormControl} from '@angular/forms';

export class ValidatorAdministration {
  static trim(control: FormControl): { [key: string]: boolean } {
    if (control.value.trim() === '') {
      return {
        trim: true
      };
    }
    return null;
  }

  static code(control: FormControl): { [key: string]: boolean } {
    const regexp = /^[a-zA-z0-9]/i;
    const arr = control.value.split('');
    for (const elem of arr) {
      if (!regexp.test(elem)) {
        return {
          code: true
        };
      }
    }
    return null;
  }

  static named(control: FormControl): { [key: string]: boolean } {
    const regexp = /^[a-zA-z0-9а-яА-яЁ-ё]/i;
    const arr = control.value.split('');
    for (const elem of arr) {
      if (!regexp.test(elem)) {
        return {
          named: true
        };
      }
    }
    return null;
  }

  static arrType(control: FormControl): { [key: string]: boolean } {
    if (control.value.length === 1 && control.value[0].length === 0) {
      return {
        arrType: true
      };
    }
    return null;
  }

  static inbreed(control: FormControl): { [key: string]: boolean } {
    if (!Number.isInteger(control.value)) {
      return {
        inbreed: true
      };
    }
    return null;
  }

  static percent(control: FormControl): { [key: string]: boolean } {
    if (control.value > 100) {
      return {
        percent: true
      };
    }
    return null;
  }

}
