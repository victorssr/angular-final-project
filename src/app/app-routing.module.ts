import { ForbiddenComponent } from './navigation/forbidden/forbidden.component';
import { NotFoundComponent } from './navigation/not-found/not-found.component';
import { HomeComponent } from './navigation/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module')
      .then(m => m.AccountModule)
  },
  {
    path: 'casa',
    loadChildren: () => import('./casa/casa.module')
      .then(m => m.CasaModule)
  },
  {
    path: 'morador',
    loadChildren: () => import('./morador/morador.module')
      .then(m => m.MoradorModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
