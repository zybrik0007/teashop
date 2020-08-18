import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTableEditor]'
})
export class TableEditorDirective {

  constructor(private element: ElementRef,
              private renderer: Renderer2
              ) {}

  @HostListener('click', ['$event']) onMouseClick(evt: MouseEvent) {
    const test = this.element.nativeElement;
    const data = test.dataset;
    if (evt.ctrlKey) {
      if (data['active'] === 'disable') {
        this.element.nativeElement.dataset['active'] = 'active';
        this.renderer.setStyle(this.element.nativeElement, 'background', '#816783');
      } else {
        this.element.nativeElement.dataset['active'] = 'disable';
        this.renderer.setStyle(this.element.nativeElement, 'background', '');
      }
    }
    else {
      const ElementAll: HTMLCollectionOf<Element> = document.getElementsByClassName('tableBlock-admin');
      for (let i = 0; i < ElementAll.length; i++) {
        (ElementAll[i] as HTMLElement).style.background = '';
        (ElementAll[i] as HTMLElement).dataset['active'] = 'disable';
      }
      if (data['active'] === 'disable') {
        this.element.nativeElement.dataset['active'] = 'active';
        this.renderer.setStyle(this.element.nativeElement, 'background', '#816783');
      } else {
        this.element.nativeElement.dataset['active'] = 'disable';
        this.renderer.setStyle(this.element.nativeElement, 'background', '');
      }
    }
  }
  @HostListener('dblclick') onMouseDoubleClick() {
    const test = this.element.nativeElement;
    const data = test.dataset;
    const ElementAll: HTMLCollectionOf<Element> = document.getElementsByClassName('tableBlock-admin');
    for (let i = 0; i < ElementAll.length; i++) {
      (ElementAll[i] as HTMLElement).style.background = '';
      (ElementAll[i] as HTMLElement).dataset['active'] = 'disable';
    }
    this.element.nativeElement.dataset['active'] = 'active';
    this.renderer.setStyle(this.element.nativeElement, 'background', '#816783');
  }


}
