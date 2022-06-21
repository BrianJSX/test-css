import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[LabelDirective]',
})
export class LabelDirective {
  @Input() rq_value!: boolean;

  constructor(private el: ElementRef) {
    this.el.nativeElement.innerHTML = "<span style='color: red'>*</span>";
  }
}
