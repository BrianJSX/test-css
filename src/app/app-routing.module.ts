import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './module/auth/page/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { NoauthGuard } from './shared/guard/noauth.guard';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./module/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'choose-country',
    canActivate: [NoauthGuard],
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./module/country/country.module').then((m) => m.CountryModule),
  },
  {
    path: 'tw/home',
    canActivate: [NoauthGuard],
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./module/home/home.module').then((m) => m.HomeModule),
  },
  { path: '**', redirectTo: 'auth/login-penguin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
