import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../util/auth.service';
import { User } from '../util/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  userInfoSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserInfo();
    this.userInfoSub = this.authService.getUserInfoListener().subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
  }

}
