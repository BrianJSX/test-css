import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-penguin',
  templateUrl: './login-penguin.component.html',
  styleUrls: ['./login-penguin.component.scss'],
})
export class LoginPenguinComponent implements OnInit {
  selectedValue = 'en';
  borderActive = false;
  stepOne = true;
  disable = true;

  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    translate.use(localStorage.getItem('lang') || 'en');
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  handleChangeInput() {
    let username = this.validateForm.controls['userName'].value;
    let password = this.validateForm.controls['password'].value;
    if (username && password) {
      this.disable = false;
    } else {
      this.disable = true;
    }
  }
  handleChangeLanguage(e: Event) {
    localStorage.setItem('lang', e.toString());
    this.translate.use(localStorage.getItem('lang') || 'en');
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
