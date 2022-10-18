import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  password: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLogged() && this.router.navigate(['/home']);
  }

  onLogin() {
    const isLogged = this.authService.logIn({name: this.username, password: this.password})
    if(isLogged)
    {
      console.log(this.authService.currentUser);
      this.router.navigate(['/home']);
    }
  }
}
