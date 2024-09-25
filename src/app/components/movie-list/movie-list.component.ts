import { Component } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IMedia } from '../../shared/model/media';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFilteredMovie } from '../../shared/state/movie/movie.selectors';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../../shared/search/search.component';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  movies$!: Observable<IMedia[]>;
  category!: string | null;
  isTrending!: boolean;
  trendingMovies: IMedia[] = [];

  constructor(private route: ActivatedRoute, private store: Store) {
    console.log(this.category);
  }

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

  // getTredingMovies() {
  //   this.movies$.pipe(map((movie) => movie)).subscribe((movie) => {
  //     movie.forEach((movie) => {
  //       if (movie.isTrending) {
  //         this.isTrending = true;
  //         this.trendingMovies.push(movie);
  //       }
  //     });
  //   });
  // }
}
