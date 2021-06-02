import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./pages/nuevo/nuevo.module').then( m => m.NuevoPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./pages/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./pages/detalle/detalle.module').then( m => m.DetallePageModule)
  }, {
    path: 'juego',
    loadChildren: () => import('./pages/juego/juego.module').then( m => m.JuegoPageModule)
  },
  {
    path: 'pregunta',
    loadChildren: () => import('./pages/pregunta/pregunta.module').then( m => m.PreguntaPageModule)
  },
  {
    path: 'jugar/:id',
    loadChildren: () => import('./pages/jugar/jugar.module').then( m => m.JugarPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'quiz/:id',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'solucionesqsq',
    loadChildren: () => import('./pages/solucionesqsq/solucionesqsq.module').then( m => m.SolucionesqsqPageModule)
  },
  {
    path: 'solucuionesquiz',
    loadChildren: () => import('./pages/solucuionesquiz/solucuionesquiz.module').then( m => m.SolucuionesquizPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'editar-respuesta',
    loadChildren: () => import('./pages/editar-respuesta/editar-respuesta.module').then( m => m.EditarRespuestaPageModule)
  },
  {
    path: '**',
    redirectTo: 'home/perfil',
    pathMatch: 'full'
  },


 
 

 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
