import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import {
  LoginResponse,
  UserCountryResponse,
} from 'src/app/core/interface/auth';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClientService,
    private cookieStorage: CookieStorage
  ) {}

  getAuthorizationHeaders() {
    const token: string | null = this.cookieStorage.getCookie('token') || '';

    return {
      Authorization: `Bearer ${token}`,
    };
  }

  login(value: object): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('/user-service/login', value)
      .pipe();
  }

  logout(): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>('/user-service/logout', {})
      .pipe();
  }

  getCountryUser(): Observable<UserCountryResponse> {
    return this.httpClient
      .post<UserCountryResponse>('/user-service/oauth/country/gets', {})
      .pipe();
  }
}
