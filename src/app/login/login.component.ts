import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  loginWithGoogle(){
    this.authService.loginWithGoogle();

  }

  loginWithGitlab(){
    this.authService.loginWithGitlab();
  }
}
