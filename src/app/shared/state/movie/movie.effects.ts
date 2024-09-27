import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieAction from '../movie/movie.actions';
import { ApiService } from '../../services/api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieAction.loadMovies),
      mergeMap(() =>
        this.apiService.getMovies().pipe(
          map((movies) => {
            localStorage.setItem('movie', JSON.stringify(movies));
            return MovieAction.loadMoviesSuccess({ movies });
          }),
          catchError((error) => {
            console.error('Failed to load movies:', error);
            return of(MovieAction.loadMoviesFailure({ error: error.message }));
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
