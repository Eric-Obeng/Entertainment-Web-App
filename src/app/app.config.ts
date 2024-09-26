import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { movieReducer } from './shared/state/movie/movie.reducer';
import { MovieEffects } from './shared/state/movie/movie.effects';
import { jwtInterceptor } from './shared/jwt/jwt.interceptor';
import { AuthGuard } from './shared/guard/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(movieReducer),
    provideEffects(),
    provideState({ name: 'movies', reducer: movieReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(MovieEffects),
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true },
    AuthGuard,
  ],
};
