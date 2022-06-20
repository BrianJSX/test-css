import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[vector-bg]'
})
export class VectorBgDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = "red";
  }

}
