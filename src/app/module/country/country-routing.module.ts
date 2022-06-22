import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCountryComponent } from './pages/choose-country/choose-country.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ChooseCountryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule {}
