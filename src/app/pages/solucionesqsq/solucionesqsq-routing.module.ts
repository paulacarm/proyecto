import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolucionesqsqPage } from './solucionesqsq.page';

const routes: Routes = [
  {
    path: '',
    component: SolucionesqsqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolucionesqsqPageRoutingModule {}
