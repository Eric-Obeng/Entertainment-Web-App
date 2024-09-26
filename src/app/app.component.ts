import { Component } from '@angular/core';
import { NavigationError, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store } from '@ngrx/store';
import { MovieState } from './shared/state/movie/movie.state';
import { loadMovies } from './shared/state/movie/movie.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Entertainment-Web-App';

  constructor(private store: Store<MovieState>) {
    this.store.dispatch(loadMovies());
  }
}
