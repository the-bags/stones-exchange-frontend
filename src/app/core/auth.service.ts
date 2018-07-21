import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { UserService } from './user.service';

interface IUser {
  name: string;
  email: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
  }

  login(credentials) {
    this.http.post(environment.apiUrl + '/login', credentials).subscribe(
      (res: IResponse) => {
        this.user = res.user;
        localStorage.setItem('token', res.token);
        this.userService.setCurrentUser(JSON.stringify(this.user));
        this.router.navigate(['/']);
      },
      err => {
        err.status === 403 ? this.router.navigate(['/registerpage']) : console.error(err);
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/loginpage']);
  }

  register(credentials) {
    this.http.post(environment.apiUrl + '/register', credentials).subscribe(
      (res: IResponse) => {
        this.user = res.user;
        localStorage.setItem('token', res.token);
        this.userService.setCurrentUser(JSON.stringify(this.user));
        this.router.navigate(['/']);
      },
      err => {
        err.status === 403 ? this.router.navigate(['/registerpage']) : console.error(err);
      }
    );
  }

}
