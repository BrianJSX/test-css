import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FontsizeService {
  fontSize$ = new BehaviorSubject<string | null>(null);

  constructor() { }

  setFontsize(fontSize: string) {
    this.fontSize$.next(fontSize);
  }
}
