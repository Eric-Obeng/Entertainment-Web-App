import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/login/login.component').then((l) => l.LoginComponent),
  },
  {
    path: '',
    // title: 'category',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },
];
