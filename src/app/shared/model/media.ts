import { IThumbnail } from './thumbnail';

export interface IMedia {
  title: string;
  thumbnail: IThumbnail;
  year: number;
  category: 'Movie' | 'Tv Series';
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}
