import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

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
    path: 'category/bookmark',
    loadComponent: () =>
      import('./components/bookmark/bookmark.component').then(
        (m) => m.BookmarkComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./components/movie-list/movie-list.component').then(
        (m) => m.MovieListComponent
      ),
  },
  // {
  //   path: 'category/bookmark',
  //   loadComponent: () =>
  //     import('./components/movie-list/movie-list.component').then(
  //       (m) => m.MovieListComponent
  //     ),
  //   canActivate: [AuthGuard],
  // },
];
