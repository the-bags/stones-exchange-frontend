import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { IUserResponse } from './../core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.isAuthenticated = !!localStorage.getItem('user');
  }

  login(credentials): Observable<IUserResponse> {

    return this.http.post<IUserResponse>(environment.apiUrl + '/login', credentials);
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  register(credentials) {
    this.http.post(environment.apiUrl + '/register', credentials).subscribe(
      (res: IUserResponse) => {
        this.isAuthenticated = true;
        localStorage.setItem('token', res.token);
        this.userService.setCurrentUser(JSON.stringify(res.user));
        this.router.navigate(['/']);
      },
      err => {
        err.status === 403 ? this.router.navigate(['/register']) : console.error(err);
      }
    );
  }
}
