import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GoogleComponent } from './google/google.component';
import { GitlabComponent } from './gitlab/gitlab.component';

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: "full"},
  {path: 'google', component: GoogleComponent},
  {path: 'gitlab', component: GitlabComponent},
  {path: '**', component: AppComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
