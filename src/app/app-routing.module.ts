import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
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
    path: '**',
    redirectTo: 'films'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
