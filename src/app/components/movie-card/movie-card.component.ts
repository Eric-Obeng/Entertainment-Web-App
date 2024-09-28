import { Component, Input } from '@angular/core';
import { IMedia } from '../../shared/model/media';
import { Store } from '@ngrx/store';
import { bookmarkMovie } from '../../shared/state/movie/movie.actions';
import { AuthService } from '../../shared/services/auth/auth.service';

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
  login: boolean = false;

  constructor(private store: Store, private authService: AuthService) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.login = isLoggedIn;
    });
  }

  onBookMarkToggle(movieTitle: string) {
    if (this.login) {
      this.store.dispatch(bookmarkMovie({ movieTitle }));
    } else {
      alert('Please login to bookmark movies.');
    }
  }
}
