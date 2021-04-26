import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path:'juego',
    loadChildren:()=>import('../pages/juego/juego.module').then(m=>m.JuegoPageModule)
   
  },
  {
    path:'admin',
    loadChildren:()=>import('../pages/admin/admin.module').then(m=>m.AdminPageModule)
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
