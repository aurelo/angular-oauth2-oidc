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

  gitlabUserData$: Observable<any>;
  showUserData: boolean = false;

  constructor(private authService: AuthService,
    private gitlabService: GitlabService){}

  logout() {
    this.authService.logout();
  }

  getUserData() {
    this.gitlabUserData$ = this.gitlabService.readUser();
  }
}
