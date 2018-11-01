import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() test: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(credentials: NgForm) {
    this.authService.register(credentials.value);
  }

  isConfirm(credentials: NgForm) {
    return credentials.value.password === credentials.value.confirm
      && credentials.value.password !== '';
  }

}
