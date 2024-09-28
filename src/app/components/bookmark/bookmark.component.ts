import { Component } from '@angular/core';
import { IMedia } from '../../shared/model/media';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectBookMarkMovies } from '../../shared/state/movie/movie.selectors';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../../shared/search/search.component";

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

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.bookmarkedMovies();

    this.movies$ = this.bookmarkMovies$.pipe(
      map((movies: IMedia[]) =>
        movies.filter((movie) => movie.category === 'Movie')
      )
    );

    this.tvSeries$ = this.bookmarkMovies$.pipe(
      map((movies: IMedia[]) =>
        movies.filter((movie) => movie.category === 'TV Series')
      )
    );

    console.log(this.movies$.subscribe((val) => console.log(val)));
    console.log(this.tvSeries$.subscribe((val) => console.log(val)));
  }

  bookmarkedMovies() {
    this.bookmarkMovies$ = this.store.select(selectBookMarkMovies);
  }
}
