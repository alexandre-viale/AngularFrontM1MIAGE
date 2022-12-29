import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
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

  async onLogin() {
    this.authService.logIn({username: this.username, password: this.password}).subscribe(
      {
        next: (response) => {
          this.authService.currentUser = response.user;
          this.authService.jwtToken = response.accessToken;
          localStorage.setItem('token', response.accessToken);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if(err.status === 401) {
            alert('Mauvais nom d\'utilisateur ou mot de passe');
          }
          if(err.status === 500) {
            alert('Erreur serveur');
          }
          if(err.status === 404) {
            alert('Utilisateur non trouvé');
          }
        }
      }
    );
  }
}
