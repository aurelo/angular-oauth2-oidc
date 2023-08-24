import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})
export class UserComponent implements OnInit{

  @Input() config: string;
  

  authenticationResult$: Observable<any>;
  userData$: Observable<any>;
  accessToken$: Observable<string>;
  idToken$: Observable<string>;
  refreshToken$: Observable<string>;
  
constructor(private oidcSecurityService: OidcSecurityService) {
}
  ngOnInit(): void {
    this.authenticationResult$ = this.oidcSecurityService.getAuthenticationResult(this.config);
    this.userData$ = this.oidcSecurityService.getUserData(this.config);
    this.accessToken$ = this.oidcSecurityService.getAccessToken(this.config);
    this.idToken$ = this.oidcSecurityService.getIdToken(this.config);
    this.refreshToken$ = this.oidcSecurityService.getRefreshToken(this.config);
  }

}
