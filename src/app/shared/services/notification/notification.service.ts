import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationResponse } from 'src/app/core/interface/notification';
import { HttpClientService } from '../httpClient/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification$ = new BehaviorSubject<NotificationResponse | null>(null);

  constructor(private httpClient: HttpClientService) {}

  setNotifycation(notification: NotificationResponse) {
    this.notification$.next(notification);
  }

  getCountNoticationUnRead() {
    return this.httpClient
      .post<NotificationResponse>(
        '/tw/notification-service/notification/read/unread',
        {
          userId: 1,
        }
      )
      .pipe();
  }

  getNotification(page?: number): Observable<NotificationResponse> {
    let data = {
      pageNumber: page ? page : 1,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      isLast: false,
      status: 'ALL',
      userId: 1,
    };

    return this.httpClient
      .post<NotificationResponse>(
        '/tw/notification-service/notification/',
        data
      )
      .pipe();
  }

  getNotificationRead(page?: number): Observable<NotificationResponse> {
    let data = {
      pageNumber: page ? page : 1,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      isLast: false,
      status: 'READ',
      userId: 1,
    };

    return this.httpClient
      .post<NotificationResponse>(
        '/tw/notification-service/notification/',
        data
      )
      .pipe();
  }

  getNotificationUnRead(page?: number): Observable<NotificationResponse> {
    let data = {
      pageNumber: page ? page : 1,
      pageSize: 10,
      totalPages: 0,
      totalElements: 0,
      isLast: false,
      status: 'UNREAD',
      userId: 1,
    };

    return this.httpClient
      .post<NotificationResponse>(
        '/tw/notification-service/notification/',
        data
      )
      .pipe();
  }
}
