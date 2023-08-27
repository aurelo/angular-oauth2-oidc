import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedResult, ConfigAuthenticatedResult, OidcSecurityService, OpenIdConfiguration, PublicEventsService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable, config, filter, map, mergeMap, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  configurations: OpenIdConfiguration[];
  //isAuthenticated$: Observable<AuthenticatedResult>;
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
    //this.isAuthenticated$ = this.oidcSecurityService.isAuthenticated$;
    this.userData$ = this.oidcSecurityService.getUserData();
  }

  get isAuthenticated$(): Observable<AuthenticatedResult> {
    return this.oidcSecurityService.isAuthenticated$;
  };

  isUserAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      take(1),
      map(ar => !!ar.allConfigsAuthenticated.find(ac => ac.isAuthenticated))
    );
  }

  authenticatedUserData(configId?: string): Observable<any> {
    return this.oidcSecurityService.userData$.pipe(
      take(1),
      mergeMap(udr => udr.allUserData),
      filter(ud => (configId != null && ud.configId === configId) || ud.userData != null),
      map(ud => ud.userData)
    );
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

  forceRefreshSession(configId: string) {
    return this.oidcSecurityService.forceRefreshSession(undefined, configId);
  }

}
