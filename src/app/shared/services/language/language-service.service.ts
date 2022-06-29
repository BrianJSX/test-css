import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoResponse } from 'src/app/core/interface/auth';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language$ = new BehaviorSubject<string | null>(
    this.cookieStorage.getCookie('lang')
  );

  constructor(
    private httpClient: HttpClientService,
    private cookieStorage: CookieStorage
  ) {}

  setLanguage(language: string) {
    this.language$.next(language);
  }

  changeLangue(value: object): Observable<UserInfoResponse> {
    return this.httpClient
      .post<UserInfoResponse>('/user-service/login', value)
      .pipe();
  }
}
