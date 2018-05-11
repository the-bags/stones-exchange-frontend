import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    console.log('SERVICE ==>', email, password);
      this.http.post('http://127.0.0.1:3001/login', {
          email,
          password
      }).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => {
          console.log('Error occured');
          this.router.navigate(['/registerpage']);
        }
      );
  }
}
