import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IMedia } from '../../shared/model/media';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFilteredMovie } from '../../shared/state/movie/movie.selectors';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  movies$!: Observable<IMedia[]>;
  category!: string | null;
  isTrending!: boolean;
  trendingMovies: any = [];

  constructor(private route: ActivatedRoute, private store: Store) {
    console.log(this.category);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
      this.movies$ = this.store.select(selectFilteredMovie(this.category));

      this.movies$.subscribe((movie) => {
        movie.filter((m) => {
          this.trendingMovies.push(m.isTrending);
        });
      });
      console.log(this.trendingMovies);
    });
  }
}
