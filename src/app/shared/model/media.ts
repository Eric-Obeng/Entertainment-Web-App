import { IThumbnail } from './thumbnail';

export interface IMedia {
  title: string;
  thumbnail: IThumbnail;
  year: number;
  category: 'Movie' | 'Tv Series';
  reting: string;
  isBookmard: string;
  isTrending: boolean;
}
