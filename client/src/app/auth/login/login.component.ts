import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/util/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const value = this.loginForm.value;
    if(value.email && value.password) this.authService.login(value.email,value.password);
  }

}
