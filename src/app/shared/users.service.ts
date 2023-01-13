import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uri = 'https://backm1miage.onrender.com/api/users';
  httpOptions = {
    headers: new HttpHeaders({
     'Authorization': 'Bearer ' + this.auth.getToken(),
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
