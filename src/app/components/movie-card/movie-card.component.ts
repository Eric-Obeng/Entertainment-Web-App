import { Component, Input } from '@angular/core';
import { IMedia } from '../../shared/model/media';

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
}
