import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showModal: boolean = false;
  login: boolean = true

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onHideModal() {
    this.showModal = false;
  }
}
