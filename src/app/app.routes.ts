import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/login/login.component').then((l) => l.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./shared/sign-up/sign-up.component').then(
        (s) => s.SignUpComponent
      ),
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
