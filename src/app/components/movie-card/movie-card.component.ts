import { Component, Input } from '@angular/core';
import { IMedia } from '../../shared/model/media';
import { Store } from '@ngrx/store';
import { bookmarkMovie } from '../../shared/state/movie/movie.actions';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() movie!: IMedia;
  @Input() isTrending!: boolean;
  @Input() bookmarked!: IMedia;

  constructor(private store: Store) {}

  onBookMarkToggle(movieTitle: string) {
    console.log('movie:', movieTitle, this.movie.isBookmarked);
    this.store.dispatch(bookmarkMovie({ movieTitle }));

    console.log('movie:', movieTitle, this.movie.isBookmarked);
  }
}
