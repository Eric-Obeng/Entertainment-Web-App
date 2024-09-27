import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.authService.isLoggedIn().pipe(
      map((loggedIn) => {
        console.log('Logged In:', loggedIn);
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
        return loggedIn;
      })
    );
  }
}
