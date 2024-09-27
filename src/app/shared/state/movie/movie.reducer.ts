import { Action, createReducer, on } from '@ngrx/store';
import * as MovieActions from '../movie/movie.actions';
import { MovieState } from './movie.state';
import { IMedia } from '../../model/media';

export const initialState: MovieState = {
  MovieItems: [],
  searchMovie: '',
  bookMarkMovies: [],
  loading: false,
  error: null,
};

export const movieReducer = createReducer(
  initialState,
  on(MovieActions.loadMovies, (state) => ({ ...state })),
  on(MovieActions.loadMoviesSuccess, (state, { movies }) => {
    const updatedMovies = movies.map((movie) => ({
      ...movie,
      isBookmarked: false
    }));
    return { ...state, MovieItems: updatedMovies };
  }),
  on(MovieActions.loadMoviesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(MovieActions.setSearchMovie, (state, { searchMovie }) => ({
    ...state,
    searchMovie,
  })),
  on(MovieActions.bookmarkMovie, (state, { movieTitle }) => {
    const updatedMovies = state.MovieItems.map((movie) => {
      if (movie.title === movieTitle) {
        return {
          ...movie,
          isBookmarked: !movie.isBookmarked,
        };
      }
      return movie;
    });

    // Create a new array of bookmarked movies based on updatedMovies
    const bookMarkedMovies = updatedMovies.filter(
      (movie) => movie.isBookmarked
    );

    return {
      ...state,
      MovieItems: updatedMovies,
      bookMarkMovies: bookMarkedMovies,
    };
  })
);
