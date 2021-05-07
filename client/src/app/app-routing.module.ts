import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './util/auth.guard';

const routes: Routes = [
  {path: "", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "**", component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
