import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  uri = `${environment.apiUrl}/users`;
   httpOptions() {
    return {
      headers: new HttpHeaders({
       'Authorization': 'Bearer ' + localStorage.getItem('token'),
       'Access-Control-Allow-Origin': '*'
      }),
     };
  }
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.uri}/${id}`, this.httpOptions());
  }
}
