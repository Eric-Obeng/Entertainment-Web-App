import { Routes } from '@angular/router';

export const routes: Routes = [
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
