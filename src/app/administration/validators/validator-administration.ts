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
}
