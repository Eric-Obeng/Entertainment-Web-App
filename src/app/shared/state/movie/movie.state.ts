import { IMedia } from '../../model/media';

export interface MovieState {
  MovieItems: IMedia[];
  searchMovie: string;
  loading: boolean;
  error: string | null;
}
