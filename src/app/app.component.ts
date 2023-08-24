import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResult, LoginResponse, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { AuthService } from './auth/auth.service';
import { Observable, map } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  configurations: OpenIdConfiguration[];
  isAuthenticated$: Observable<AuthenticatedResult>;
  userData$: Observable<UserDataResult>;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    public authService: AuthService,
    private notification: NzNotificationService,
    private message: NzMessageService
  ) {
  }


  ngOnInit(): void {
    this.configurations = this.oidcSecurityService.getConfigurations();
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.checkAuthMultiple().subscribe((resp: LoginResponse[]) => {
      console.log("LoginResponse", resp);
      let success = resp.find(login => login.isAuthenticated);

      console.log("success?", success);

      if (success?.configId) {
        //this.notification.success(success.configId, "Succesfull log in!");
        //this.message.success(success.configId + " login!");
        this.router.navigate([success.configId]);
      }
    }
    );
  }

  isAuthenticated(a: AuthenticatedResult): boolean {
    return this.authService.isAnyAuthenticated(a.allConfigsAuthenticated);
  }

  userPicture(a: AuthenticatedResult): Observable<string> {
    return this.authService.authenticatedUserData(a).pipe(
      map((ud:any)  => ud?.picture)
    );
  }

  userName(a: AuthenticatedResult): Observable<string> {
    return this.authService.authenticatedUserData(a).pipe(
      map((ud:any)  => ud?.name)
    );
  }

  logout() {
    this.authService.logout();
  }

}
