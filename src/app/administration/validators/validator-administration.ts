import {FormControl} from '@angular/forms';

export class ValidatorAdministration {
  static trim(control: FormControl): {[key: string]: boolean} {
    if (control.value.trim() === '') {
      return {
        trim : true
      };
    }
    return null;
  }
  static number(control: FormControl): {[key: string]: boolean} {
    if (control.value === null) {
      return {
        number: true
      };
    }
    return null;
  }
}
