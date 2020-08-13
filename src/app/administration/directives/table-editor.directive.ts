import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTableEditor]'
})
export class TableEditorDirective {

  constructor(private element: ElementRef,
              private renderer: Renderer2
              ) {}

  @HostListener('click') onMouseClick() {
    const test = this.element.nativeElement;
    const data = test.dataset;
    if (data['active'] === 'disable') {
      this.element.nativeElement.dataset['active'] = 'active';
      this.renderer.setStyle(this.element.nativeElement, 'background', '#816783');
    } else {
      this.element.nativeElement.dataset['active'] = 'disable';
      this.renderer.setStyle(this.element.nativeElement, 'background', '');
    }
  }

}
