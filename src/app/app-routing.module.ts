import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { 
    path: 'login', 
    loadChildren: './login/login.module#LoginPageModule'

  },
  { 
    path: '', 
    loadChildren: './registro/registro.module#RegistroPageModule' ,
    canActivate: [TutorialGuard] 
  },
  { 
    path: 'tutorial', 
    loadChildren: './tutorial/tutorial.module#TutorialPageModule'
   }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


