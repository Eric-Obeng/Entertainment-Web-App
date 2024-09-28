import { Component } from '@angular/core';
import { IMedia } from '../../shared/model/media';
import { map, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectBookMarkMovies,
  selectSearchMovie,
} from '../../shared/state/movie/movie.selectors';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, HeaderComponent, SearchComponent],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss',
})
export class BookmarkComponent {
  bookmarkMovies$!: Observable<IMedia[]>;
  movies$!: Observable<IMedia[]>;
  tvSeries$!: Observable<IMedia[]>;
  searchQuery$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Select the bookmarked movies and the search query from the store
    this.bookmarkMovies$ = this.store.select(selectBookMarkMovies);
    this.searchQuery$ = this.store.select(selectSearchMovie);

    // Filter movies and TV series based on the search query and category
    this.movies$ = this.getFilteredMedia('Movie');
    this.tvSeries$ = this.getFilteredMedia('TV Series');
  }

  getFilteredMedia(category: string): Observable<IMedia[]> {
    return combineLatest([this.bookmarkMovies$, this.searchQuery$]).pipe(
      map(([movies, searchQuery]) =>
        movies.filter(
          (movie) =>
            movie.category === category &&
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );
  }
}
