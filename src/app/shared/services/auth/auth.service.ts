import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/core/interface/auth';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClientService, private cookieStorage: CookieStorage) { }

  getAuthorizationHeaders() {
    const token: string | null = this.cookieStorage.getCookie("token")|| '';
    return {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  login(value: object): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>('/user-service/login', value)
      .pipe();
  }

}
