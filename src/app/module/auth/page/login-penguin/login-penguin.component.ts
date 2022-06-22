import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  loading = false;

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.loading = true;
      this.authService.login(this.validateForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.cookieStorage.setCookie(
            'token',
            res.data.access_token,
            res.data.expired_in
          );
          this.router.navigateByUrl('/choose-country');
        },
        (err) => {
          this.loading = false;
          alert(err.message);
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
    private authService: AuthService,
    private router: Router
  ) {
    translate.use(cookieStorage.getCookie('lang') || 'en');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required, this.spaceValidation]],
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

  spaceValidation = (control: FormControl): { [s: string]: boolean } => {
    let space = /^\S+/;
    let spaceEnd = /[^.\s]$/
    if (!control.value) {
      return { required: true };
    }  else if (!control.value.match(space)) {
      return { required: true };
    }  else if (!control.value.match(spaceEnd)) {
      return { required: true };
    }
    return {};
  };

}
