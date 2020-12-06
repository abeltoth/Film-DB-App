import { NgModule } from '@angular/core';
import { AuthGuard } from './services/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'films',
        pathMatch: 'full',
      },
      {
        path: 'films',
        loadChildren: () => import('./pages/film/film.module').then(mod => mod.FilmModule)
      },
      {
        path: 'watch-list',
        loadChildren: () => import('./pages/watch-list/watch-list.module').then(mod => mod.WatchListModule)
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'films'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
