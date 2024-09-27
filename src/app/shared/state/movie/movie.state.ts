import { IMedia } from '../../model/media';

export interface MovieState {
  MovieItems: IMedia[];
  searchMovie: string;
  bookMarkMovies: IMedia[];
  loading: boolean;
  error: string | null;
}
