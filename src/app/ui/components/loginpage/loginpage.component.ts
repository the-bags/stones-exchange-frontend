import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(credentials: NgForm) {
    this.authService.login(credentials.value);
  }

}
