import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    email: '',
    password: '',
    family: '',
    first: ''
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    //console.log(this.signupForm.value);
    const value = this.signupForm.value;
    this.authService.signup(value.email,value.password,value.family,value.first);
  }

}
