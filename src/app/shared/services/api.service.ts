import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment.development';
import { IMedia } from '../model/media';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<IMedia[]>(this.API_URL);
  }
}
