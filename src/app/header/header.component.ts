import { Component, OnInit } from '@angular/core';
import { AuthenticatedResult, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit{
  isAuthenticated$: Observable<AuthenticatedResult>;
  
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private authService: AuthService
  ) {
  }
  
  ngOnInit(): void {
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
  }

  isUserAuthenticated(a: AuthenticatedResult): boolean {
    return this.authService.isUserAuthenticated(a);
  }

  userPicture(a: AuthenticatedResult): Observable<any> {
    return this.authService.userPicture(a);
  }

  userName(a: AuthenticatedResult): Observable<string> {
    return this.authService.userName(a);
  }

  logout() {
    this.authService.logout();
  }

}
