import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GitlabService } from './gitlab.service';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.component.html',
  styles: [
  ]
})
export class GitlabComponent {

  gitlabUserData: string = '';

  constructor(private authService: AuthService,
    private gitlabService: GitlabService){}

  logout() {
    this.authService.logout();
  }

  getUserData() {
    this.gitlabService.readUser().subscribe(
      data => this.gitlabUserData = data
    );
  }
}
