import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, fromEvent, map, Observable, tap } from 'rxjs';
import { setSearchMovie } from '../state/movie/movie.actions';
import { selectSearchMovie } from '../state/movie/movie.selectors';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  category!: string | null;
  searchMovie$!: Observable<string>;
  searchValue!: string;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
    });

    const searchInput = document.querySelector('.search') as HTMLElement;

    fromEvent(searchInput, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(400),
        tap((query) => {
          this.store.dispatch(setSearchMovie({ searchMovie: query }));
        })
      )
      .subscribe();

    this.searchMovie$ = this.store.select(selectSearchMovie);
    this.searchMovie$.subscribe(
      (searchMove) => (this.searchValue = searchMove)
    );
  }

  getPlaceHolder() {
    if (this.category === 'movie') {
      return `Search for movies`;
    } else if (this.category === 'tv series') {
      return `Search for Tv series`;
    } else if (this.category === 'bookmark') {
      return `Search for bookmarked shows`;
    } else {
      return `Search for movies or Tv series`;
    }
  }
}
