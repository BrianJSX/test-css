import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPenguinComponent } from './page/login-penguin/login-penguin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginPenguinComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzButtonModule,
    NzSelectModule,
    FormsModule
  ]
})
export class AuthModule { }
