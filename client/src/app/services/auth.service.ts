import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, family: string, first: string){
    this.http.post(environment.url + '/user/signup',{email:email, password:password, fullname:{family:family, first:first}}).subscribe(res => {
      console.log(res);
    })
  }
}
