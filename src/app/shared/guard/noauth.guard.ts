import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieStorage } from 'src/app/core/utils/cookie';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuard implements CanActivate {
  constructor(private cookieStorage: CookieStorage, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let accessToken = this.cookieStorage.getCookie('token');

      if (!accessToken) {
        this.router.navigateByUrl('auth/login-penguin');
        return false;
      }
      return true;

  }

}
