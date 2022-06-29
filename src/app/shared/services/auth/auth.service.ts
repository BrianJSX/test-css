import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';
import {
  DataUserInfoResponse,
  LoginResponse,
  UserCountryResponse,
  UserInfoResponse,
  UserProfileResponse,
} from 'src/app/core/interface/auth';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { FontsizeService } from '../fontSize/fontsize.service';
import { HttpClientService } from '../httpClient/http-client.service';
import { LanguageService } from '../language/language-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo$ = new BehaviorSubject<UserInfoResponse | null>(null);
  userProfile$ = new BehaviorSubject<UserProfileResponse | null>(null);

  constructor(
    private httpClient: HttpClientService,
    private cookieStorage: CookieStorage,
    private languageService: LanguageService,
    private fontSizeSerive: FontsizeService
  ) {}

  setUserInfo(user: UserInfoResponse) {
    this.userInfo$.next(user);
  }

  setUserProfile(user: UserProfileResponse) {
    this.userProfile$.next(user);
  }

  getAuthorizationHeaders() {
    const token: string | null = this.cookieStorage.getCookie('token') || '';
    let country = 'tw';
    return {
      'content-type': 'application/json',
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
      .pipe(
        map((response) => {
          let language = response.data.language;
          let fontSize = "";
          console.log(response);

          switch (response.data.fontSize) {
            case "0":
              fontSize = "1rem"
              break;
            case "1":
              fontSize = "1.1rem"
              break;
            case "2":
              fontSize = "1.2rem"
              break;
            case "3":
              fontSize = "1.3rem"
              break;
            default:
              break;
          }
          this.cookieStorage.setCookie('lang', language);
          this.languageService.setLanguage(language as string);
          this.fontSizeSerive.setFontsize(fontSize);
          return response;
        })
      );
  }

  updateUserProfile(params: object): Observable<UserProfileResponse> {
    return this.httpClient
      .post<UserInfoResponse>('/user-service/oauth/profile/update', params)
      .pipe();
  }
}
