import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uri = 'http://localhost:8010/api/users';
  httpOptions = {
    headers: new HttpHeaders({
     'Authorization': 'Bearer ' + this.auth.jwtToken,
    }),
   };

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`, this.httpOptions);
  }
}
