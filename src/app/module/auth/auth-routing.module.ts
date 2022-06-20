import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPenguinComponent } from './page/login-penguin/login-penguin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login-penguin',
        component: LoginPenguinComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
