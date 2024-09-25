import { createAction, props } from '@ngrx/store';
import { IMedia } from '../../model/media';

export const loadMovies = createAction('[Movie] Load Movies');
export const loadMoviesSuccess = createAction(
  '[Movie] Load Movies Success',
  props<{ movies: IMedia[] }>()
);
export const loadMoviesFailure = createAction(
  '[Movie] Load Movies Failure',
  props<{ error: string }>()
);

export const setSearchMovie = createAction(
  '[Movie] Set Search Movie',
  props<{ searchMovie: string }>()
);
