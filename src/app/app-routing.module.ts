import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule'

  },
  { 
    path: '', 
    loadChildren: './pages/registro/registro.module#RegistroPageModule' ,
    canActivate: [TutorialGuard] 
  },
  { 
    path: 'tutorial', 
    loadChildren: './pages/tutorial/tutorial.module#TutorialPageModule'
   },
   { 
    path: 'mis-datos', 
    loadChildren: './pages/mis-datos/mis-datos.module#MisDatosPageModule'
   },
   { 
    path: 'registro', 
    loadChildren: './pages/registro/registro.module#RegistroPageModule'
   },
   { 
    path: 'acerca-de', 
    loadChildren: './pages/acerca-de/acerca-de.module#AcercaDePageModule'
   }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


