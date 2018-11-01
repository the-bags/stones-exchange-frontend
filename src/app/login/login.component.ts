import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../core/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(credentials: NgForm) {
    this.authService.login(credentials.value).subscribe(
      (res: IUserResponse) => {
        this.authService.isAuthenticated = true;
        localStorage.setItem('token', res.token);
        this.userService.setCurrentUser(res.user);
        this.router.navigate(['/']);
      },
      err => {
        err.status === 403 ? this.router.navigate(['/register']) : console.error(err);
      }
    );
  }

}
