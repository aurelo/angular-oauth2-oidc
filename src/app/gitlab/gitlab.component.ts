import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { GitlabService } from './gitlab.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gitlab',
  templateUrl: './gitlab.component.html',
  styles: [
  ]
})
export class GitlabComponent {

  gitlabUserData: string = '';

  constructor(private authService: AuthService,
    private gitlabService: GitlabService,
    private router: Router) { }

  logout() {
    this.authService.logout();
  }

  forceRefresh() {
    this.authService.forceRefreshSession('gitlab').subscribe(
      data => {
        console.log("session refreshed", data);

        // hack to refresh token values without reloading the page (so network calls remain in developer toolbar for showcase)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([`/gitlab`]).then(() => {
            console.log(`After navigation I am on:${this.router.url}`)
          })
        })
        //location.reload();
      }
    );
  }

  getUserData() {
    this.gitlabService.readUser().subscribe(
      data => this.gitlabUserData = data
    );
  }
}
