import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: this.authService.getAuthorizationHeaders(),
    });

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          /// Handle request is success
        }
      }, err => {
        if (err.status === 401) {
          this.router.navigateByUrl("/auth/login");
        }
      })
    );
  }

}
