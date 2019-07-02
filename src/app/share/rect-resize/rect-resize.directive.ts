import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[zeppelinRectResize]'
})
export class RectResizeDirective {
  el: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    this.el = this.elementRef.nativeElement;
  }
}
