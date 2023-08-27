import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './auth/auth.service';
import { map } from 'rxjs';


export const isAuthenticatedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(NzMessageService);
  
   return authService.isUserAuthenticated().pipe(
     map(isAuthenticated => {
       if (!isAuthenticated) {
         messageService.error("Please log in!");
         router.navigate([""]);
         return false;
       }
       return true;
     })
  )
}
