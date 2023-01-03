import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
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
  currentUser: User = {
    username: 'guest',
    type: this.userTypes.GUEST,
  };

  constructor(private router: Router, private http: HttpClient) {}
  
  logIn(logInfos: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.uri}/login`, logInfos);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  logout() {
    this.currentUser = {
      username: 'guest',
      password: 'guest',
      type: this.userTypes.GUEST,
    };
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isAdmin():boolean {
    return this.currentUser.type === this.userTypes.ADMIN;
  }
  isLogged():boolean  {
    return (this.currentUser.type === this.userTypes.USER || this.currentUser.type === this.userTypes.ADMIN)
  }
  isUser():boolean {
    return this.currentUser.type === this.userTypes.USER;
  }
  isGuest():boolean {
    return this.currentUser.type === this.userTypes.GUEST;
  }
  getCurrentUser(){
    return this.currentUser;
  }
}