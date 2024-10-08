import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IMedia } from '../../shared/model/media';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectBookMarkMovies,
  selectFilteredMovie,
} from '../../shared/state/movie/movie.selectors';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../../shared/search/search.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { BookmarkComponent } from '../bookmark/bookmark.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchComponent,
    MovieCardComponent,
    BookmarkComponent,
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  movies$!: Observable<IMedia[]>;
  category!: string | null;
  isTrending!: boolean;
  trendingMovies: IMedia[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
      this.movies$ = this.store.select(selectFilteredMovie(this.category));
    });

    this.movies$
      .pipe(map((movies) => movies.filter((movie) => movie.isTrending)))
      .subscribe((trending) => {
        this.trendingMovies = trending;
        this.isTrending = this.trendingMovies.length > 0;
      });
  }

  getCategoryName() {
    if (this.category === 'movie') {
      return `Movies`;
    } else if (this.category === 'tv series') {
      return `TV Series`;
    } else if (this.category === 'bookmark') {
      return null;
    } else {
      return `Recommended for you`;
    }
  }
}
