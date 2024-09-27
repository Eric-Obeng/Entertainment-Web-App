import { Component } from '@angular/core';
import { IMedia } from '../../shared/model/media';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookMarkMovies } from '../../shared/state/movie/movie.selectors';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss',
})
export class BookmarkComponent {
  bookmarkMovies$!: Observable<IMedia[]>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.bookmarkedMovies();
  }

  bookmarkedMovies() {
    this.bookmarkMovies$ = this.store.select(selectBookMarkMovies);
  }

  // getCategoryName() {
  //   if (this.category === 'movie') {
  //     return `Movies`;
  //   } else if (this.category === 'tv series') {
  //     return `TV Series`;
  //   } else if (this.category === 'bookmark') {
  //     return `Bookmarked Movies`;
  //   } else {
  //     return `Recommended for you`;
  //   }
  // }
}
