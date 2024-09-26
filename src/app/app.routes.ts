import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (l) => l.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/sign-up/sign-up.component').then(
        (s) => s.SignUpComponent
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
