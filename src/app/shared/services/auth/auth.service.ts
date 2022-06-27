import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import {
  LoginResponse,
  UserCountryResponse,
  UserInfoResponse,
  UserProfileResponse,
} from 'src/app/core/interface/auth';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo$ = new BehaviorSubject<UserInfoResponse | null>(null);
  userProfile$ = new BehaviorSubject<UserProfileResponse | null>(null);

  constructor(
    private httpClient: HttpClientService,
    private cookieStorage: CookieStorage
  ) {}

  setUserInfo(user: UserInfoResponse) {
    this.userInfo$.next(user);
  }

  setUserProfile(user: UserProfileResponse) {
    this.userProfile$.next(user);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.cookieStorage.getCookie('token') || '';
    let country = this.cookieStorage.getCookie("lang") || "tw";
    return {
      'x-country-code': country,
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

  getUserInfo(): Observable<UserInfoResponse> {
    return this.httpClient
      .post<UserInfoResponse>('/user-service/oauth/info', {})
      .pipe();
  }

  getUserProfile(): Observable<UserProfileResponse> {
    return this.httpClient
      .post<UserInfoResponse>('/user-service/oauth/profile/gets', {})
      .pipe();
  }
}
