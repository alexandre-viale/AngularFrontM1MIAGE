import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router) {}

  userTypes = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
  };
  
  currentUser: { name: string; password: string; type: string } = {
    name: 'guest',
    password: 'guest',
    type: this.userTypes.GUEST,
  };

  users: Array<any> = [
    { name: 'admin', password: 'admin', type: this.userTypes.ADMIN },
    { name: 'user', password: 'user', type: this.userTypes.USER },
  ];

  logIn(logInfos: { name: any; password: any }) {
    const user = this.users.find((user) => user.name === logInfos.name);
    if (user && user.password === logInfos.password) {
      this.currentUser = user;
      return true;
    }
    return false;
  }
  logout() {
    this.currentUser = {
      name: 'guest',
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
