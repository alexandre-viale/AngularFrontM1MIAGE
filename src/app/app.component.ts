import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'Application de gestion des devoirs';

  get isLogged() {
    return this.authService.isLogged();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  constructor(private router: Router, private authService: AuthService) {}
}
