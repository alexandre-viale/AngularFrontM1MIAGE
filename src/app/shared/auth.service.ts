import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../assignments/user.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = 'http://localhost:8010/api/user';

  userTypes = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
  };
  jwtToken: string | null = null;
  currentUser: User = {
    username: 'guest',
    type: this.userTypes.GUEST,
  };

  constructor(private router: Router, private http: HttpClient) {}
  
  logIn(logInfos: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.uri}/login`, logInfos);
  }

  logout() {
    this.currentUser = {
      username: 'guest',
      password: 'guest',
      type: this.userTypes.GUEST,
    };
    this.router.navigate(['/login']);
  }
  isAdmin():boolean {
    return this.currentUser.type === this.userTypes.ADMIN;
  }
  isLogged():boolean  {
    return (this.currentUser.type === this.userTypes.USER || this.currentUser.type === this.userTypes.ADMIN)
  }
  getCurrentUser(){
    return this.currentUser;
  }

}