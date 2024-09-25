import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  category!: string | null;
  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      this.category = params['category'] || null;
    });
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
