import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: [{
            configId: 'google',
            authority: 'https://accounts.google.com',
            redirectUrl: window.location.origin + window.location.pathname,
            postLogoutRedirectUri: window.location.origin + window.location.pathname,
            clientId: '491499355097-tqd7v7g054r7cep50csdqcju6vhu7k61.apps.googleusercontent.com',
            scope: 'openid profile email https://www.googleapis.com/auth/gmail.labels',
            responseType: 'id_token token',
            silentRenew: true,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
            secureRoutes: ['https://gmail.googleapis.com/gmail/v1']
        },
        {
            configId: 'gitlab', 
            authority: 'https://gitlab.com',
            redirectUrl: window.location.origin + window.location.pathname,
            postLogoutRedirectUri: window.location.origin  + window.location.pathname,
            clientId: 'b0bb04766b8cc6dc54bdaeb2909e27bdee82c8c358101f106f71b3c7648f0476',
            scope: 'openid read_user',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
            secureRoutes: ['https://gitlab.com']
        }]
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
