import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }

  getHttpClient(): HttpClient {
    return this.httpClient;
  }

  get<T>(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<T | any> {
    return this.httpClient
      .get(`${environment.API_URL}${path}`, { params })
      .pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: Object = {}): Observable<T | any> {
    return this.httpClient
      .put(`${environment.API_URL}${path}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: Object = {}): Observable<T | any> {
    return this.httpClient
      .post(`${environment.API_URL}${path}`, JSON.stringify(body))
      .pipe(catchError(this.handleError));
  }

  delete<T>(path: string): Observable<T | any> {
    return this.httpClient
      .delete(`${environment.API_URL}${path}`)
      .pipe(catchError(this.handleError));
  }
}
