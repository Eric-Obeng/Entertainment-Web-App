import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerURL: string =
    'https://entertainment-web-app-backend-2.onrender.com/api/register';
  private loginURL =
    'https://entertainment-web-app-backend-2.onrender.com/api/login';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private setSession(authResult: any) {
    console.log('Auth result:', authResult);
    if (authResult && authResult.token) {
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('username', authResult.email || '');
      this.authStatus.next(true);
    } else {
      console.error('Invalid auth result:', authResult);
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.registerURL, userData).pipe(
      tap((response: any) => {
        console.log('Registration response:', response);
        if (response && response.token) {
          this.setSession(response);
        }
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginURL, userData).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        this.setSession(response);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.authStatus.next(false);
  }
}
