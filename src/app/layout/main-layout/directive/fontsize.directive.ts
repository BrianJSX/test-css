import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appFontsize]',
})
export class FontsizeDirective implements OnInit {
  @Input() fontSize = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}
}
