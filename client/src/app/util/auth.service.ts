import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfoListener = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, family: string, first: string){
    this.http.post(environment.url + '/user/signup',{email:email, password:password, fullname:{family:family, first:first}}).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login']);
    })
  }

  login(email: string, password:string) {
    this.http.post<{message: string, email: string}>(environment.url + '/user/login', {email,password}).subscribe(res => {
      console.log(res.message);
      localStorage.setItem('email',email);
      this.router.navigate(['/']);
    },error => {
      console.log(error.error);
    })
  }

  getUserInfo(){
    this.http.get<User>(environment.url + '/user/info').subscribe(user => {
      this.userInfoListener.next(user);
    }, (error) => {
      if (error.status === 403){
        this.router.navigate(['/login']);
        localStorage.removeItem('email');
      }
    })
  }

  getUserInfoListener(){
    return this.userInfoListener.asObservable();
  }

  logout() {
    this.http.post(environment.url + '/user/logout', {}).subscribe(msg => {
      console.log(msg);
      localStorage.removeItem('email');
      this.router.navigate(['/login'])
    }, error => {
      console.log(error.error.message);
    })
  }
}
