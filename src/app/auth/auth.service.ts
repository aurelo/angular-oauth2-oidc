import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResult, ConfigAuthenticatedResult, OidcSecurityService, OpenIdConfiguration, PublicEventsService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable, filter, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  configurations: OpenIdConfiguration[];
  isAuthenticated$: Observable<AuthenticatedResult>;
  userData$: Observable<UserDataResult>;

  constructor(private oidcSecurityService: OidcSecurityService,
    private eventService: PublicEventsService,
    private router: Router
  ) {

    // this.eventService.registerForEvents()
    // .pipe(
    //   tap(value => console.log("oidc event", value))
    // )
    // .subscribe(value => console.log("oidc event", value))
  }


  ngOnInit(): void {
    this.configurations = this.oidcSecurityService.getConfigurations();
    this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.userData$;
  }

  isAuthenticated(isAuthenticated$: Observable<AuthenticatedResult>): Observable<boolean> {
    return isAuthenticated$.pipe(
      take(1),
      map((a: AuthenticatedResult) => {
        return !!a.allConfigsAuthenticated.find(a => a.isAuthenticated);
      })
    );
  }

  isAnyAuthenticated(allConfigsAuthenticated: ConfigAuthenticatedResult[]): boolean {
    return !!allConfigsAuthenticated.find(c => c.isAuthenticated);
  }

  authenticatedUserData(authenticatedResult: AuthenticatedResult): Observable<any> {
    const configId = authenticatedResult.allConfigsAuthenticated.find(a => a.isAuthenticated)?.configId;
    return this.oidcSecurityService.getUserData(configId);
  }


  loginWithGoogle() {
    this.oidcSecurityService.authorize("google");
  }

  loginWithGitlab() {
    this.oidcSecurityService.authorize("gitlab");
  }

  logout() {
    this.oidcSecurityService.logoff();
    this.oidcSecurityService.logoffLocalMultiple();
    this.router.navigate([""]);
  }
}
