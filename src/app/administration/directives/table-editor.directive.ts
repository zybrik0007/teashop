import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTableEditor]'
})
export class TableEditorDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onMouseClick() {
    console.log(this);
  }

}
