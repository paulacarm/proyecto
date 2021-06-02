import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolucuionesquizPage } from './solucuionesquiz.page';

const routes: Routes = [
  {
    path: '',
    component: SolucuionesquizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolucuionesquizPageRoutingModule {}
