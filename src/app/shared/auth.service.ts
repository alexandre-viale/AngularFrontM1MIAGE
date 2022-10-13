import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn  = false;
  logIn(){
    this.loggedIn = true;
  }
  logout(){
    this.loggedIn = false;
  }
  isAdmin(){
    const isUserAdmin = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 200);
    })
    return isUserAdmin;
  }
  constructor() { }
}
