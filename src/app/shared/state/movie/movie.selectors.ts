import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './movie.state';
import { IMedia } from '../../model/media';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  (movieItems: MovieState) => movieItems.MovieItems
);

export const selectSearchMovie = createSelector(
  selectMovieState,
  (movieItem: MovieState) => movieItem.searchMovie
);

// select filtered category
export const selectFilteredMovie = (category: string | null) =>
  createSelector(
    selectAllMovies,
    selectSearchMovie,
    (allMovies: IMedia[], searchTerm: string = '') => {
      return allMovies.filter((movie) => {
        const searchMatch = movie.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const categoryMatch =
          !category || movie.category.toLowerCase() === category.toLowerCase();
        return searchMatch && categoryMatch;
      });
    }
  );
