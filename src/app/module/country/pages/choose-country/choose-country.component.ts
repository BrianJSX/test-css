import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { difference, indexOf } from 'lodash';
@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss'],
})
export class ChooseCountryComponent implements OnInit {
  country = ['sg', 'my', 'tw'];
  countryHidden: Array<string> = [];

  constructor(
    private cookieStorage: CookieStorage,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    translate.use(cookieStorage.getCookie('lang') || 'en');
  }

  ngOnInit(): void {
    this.getCountryUser();
    console.log(this.countryHidden);

  }

  goToTaiwan() {
    this.router.navigateByUrl("/tw/home");
  }

  getCountryUser() {
    this.authService.getCountryUser().subscribe((res) => {
      let filter = difference(this.country, res.data);
      this.countryHidden = filter;
    });
  }

  handleLogout() {
    this.authService.logout().subscribe(
      (res) => {
        this.router.navigateByUrl('/auth/login-penguin');
        this.cookieStorage.deleteAllCookies();
      },
      (err) => {
        console.log(err);
        this.cookieStorage.deleteAllCookies();
        this.router.navigateByUrl('/auth/login-penguin');
      }
    );
  }
}
