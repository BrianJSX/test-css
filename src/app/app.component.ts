import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(public translate: TranslateService){
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['en', 'jp']);
    localStorage.setItem('lang', 'en');
  }
}
