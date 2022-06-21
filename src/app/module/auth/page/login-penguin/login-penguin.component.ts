import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CookieStorage } from 'src/app/core/utils/cookie';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HttpClientService } from 'src/app/shared/services/httpClient/http-client.service';

@Component({
  selector: 'app-login-penguin',
  templateUrl: './login-penguin.component.html',
  styleUrls: ['./login-penguin.component.scss'],
})
export class LoginPenguinComponent implements OnInit {
  selectedValue = this.cookieStorage.getCookie('lang') || 'en';
  borderActive = false;
  stepOne = true;
  disable = true;

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.authService.login(this.validateForm.value).subscribe(
        (res) => {
          this.cookieStorage.setCookie(
            'token',
            res.data.access_token,
            res.data.expired_in
          );
          alert("login success");
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private cookieStorage: CookieStorage,
    private authService: AuthService
  ) {
    translate.use(cookieStorage.getCookie('lang') || 'en');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  handleChangeInput() {
    let username = this.validateForm.controls['username'].value;
    let password = this.validateForm.controls['password'].value;
    if (username && password) {
      this.disable = false;
    } else {
      this.disable = true;
    }
  }
  handleChangeLanguage(e: Event) {
    this.cookieStorage.setCookie('lang', e.toString());
    this.translate.use(this.cookieStorage.getCookie('lang') || 'en');
  }

  handleStep() {
    this.stepOne = !this.stepOne;
  }

  handleBorderActive() {
    this.borderActive = true;
  }

  handleBorderBlur() {
    this.borderActive = false;
  }
}
