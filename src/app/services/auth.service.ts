import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

interface IUser {
  authenticated: boolean;
  name: string;
  email: string;
}

interface IResponse {
  user: IUser;
  id_token: string;
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser;

  constructor(private router: Router, private http: HttpClient) {
    this.user = {
      authenticated: localStorage.getItem('authenticated') === 'true' ? true : false,
      name: localStorage.getItem('user_name') ? localStorage.getItem('user_name') : '',
      email: localStorage.getItem('user_email') ? localStorage.getItem('user_email') : ''
    };
    console.log(this.user);
  }

  login(credentials) {
      this.http.post(environment.apiUrl + '/login', credentials).subscribe(
        (res: IResponse) => {
          console.log(res);
          this.user.authenticated = true;
          this.user.name = res.user.name;
          this.user.email = res.user.email;
          localStorage.setItem('id_token', res.id_token);
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('user_name', this.user.name);
          localStorage.setItem('user_email', this.user.email);
          this.router.navigate(['/']);
        },
        err => {
          err.status === 403 ? this.router.navigate(['/registerpage']) : console.error(err);
        }
      );
  }
    logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('authenticated');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      this.user.authenticated = false;
      this.user.name = '';
      this.user.email = '';
      this.router.navigate(['/loginpage']);
    }

    register(credentials) {
      this.http.post(environment.apiUrl + '/register', credentials).subscribe(
        (res: IResponse) => {
          console.log(res);
          this.user.authenticated = true;
          this.user.name = res.user.name;
          this.user.email = res.user.email;
          localStorage.setItem('id_token', res.id_token);
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('user_name', this.user.name);
          localStorage.setItem('user_email', this.user.email);
          this.router.navigate(['/']);
        },
        err => {
          err.status === 403 ? this.router.navigate(['/registerpage']) : console.error(err);
        }
      );
    }

}
