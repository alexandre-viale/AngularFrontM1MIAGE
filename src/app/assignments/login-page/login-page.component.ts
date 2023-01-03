import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authService.isLogged() && this.router.navigate(['/home']);
  }

  async onLogin() {
    this.authService.logIn({username: this.username, password: this.password}).subscribe(
      {
        next: (response) => {
          this.authService.currentUser = response.user;
          this.authService.setToken(response.accessToken)
          this.router.navigate(['']);
        },
        error: (err) => {
          if(err.status === 401) {
            this._snackBar.open("Mot de passe incorrect", "Fermer");
          }
          if(err.status === 500) {
            this._snackBar.open("Erreur serveur", "Fermer");
          }
          if(err.status === 404) {
            this._snackBar.open("Utilisateur non trouvé", "Fermer");
          }
        }
      }
    );
  }
}
