import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showModal: boolean = false;
  isloggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isloggedIn$ = this.authService.isLoggedIn();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onHideModal() {
    this.showModal = false;
  }

  logOut() {
    console.log('logout sucessfull');
    this.authService.logout();
  }
}
