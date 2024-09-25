import { Action, createReducer, on } from '@ngrx/store';
import * as MovieActions from '../movie/movie.actions';
import { MovieState } from './movie.state';
import { IMedia } from '../../model/media';

export const initialState: MovieState = {
  MovieItems: [],
  searchMovie: '',
  loading: false,
  error: null,
};

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.loadMovies, (state) => ({ ...state })),
  on(MovieActions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    MovieItems: movies,
  })),
  on(MovieActions.loadMoviesFailure, (state, { error }) => {
    console.error(error);
    return state;
  })
);
