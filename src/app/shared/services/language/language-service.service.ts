import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieStorage } from 'src/app/core/utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language$ = new BehaviorSubject<string | null>(this.cookieStorage.getCookie('lang'));

  constructor(private cookieStorage: CookieStorage) {}

  setLanguage(language: string) {
    this.language$.next(language);
  }
}
