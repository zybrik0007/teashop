import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appModaltransfer]'
})
export class ModaltransferDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mousemove') onDown() {
  }

}
