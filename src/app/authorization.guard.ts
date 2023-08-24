import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './auth/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';


export const isAuthenticatedGuard = () => {
  const oidcSecurityService = inject(OidcSecurityService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(NzMessageService);

  // if (!authService.isAuthenticated(oidcSecurityService.isAuthenticated$)) {
  //   messageService.error("Please log in!");
  //   router.navigate([""]);
  //   return false;
  // }

  // return true;

  
   return authService.isAuthenticated(oidcSecurityService.isAuthenticated$).pipe(
     map((isAuthenticated: boolean) => {
       if (!isAuthenticated) {
         messageService.error("Please log in!");
         router.navigate([""]);
         return false;
       }
       return true;
     })
  )
}
