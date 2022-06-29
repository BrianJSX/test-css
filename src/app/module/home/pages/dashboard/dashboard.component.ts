import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { LanguageService } from 'src/app/shared/services/language/language-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  constructor(
    private translate: TranslateService,
    private cookieStorage: CookieStorage,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.cookieStorage.getCookie('lang') || 'en');
    this.languageService.language$.subscribe((res) => {
      if (res) {
        this.translate.use(res);
      }
    });
  }
}
