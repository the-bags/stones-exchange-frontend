import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  isCollapsed: boolean;

  constructor(
    public authService: AuthService,
    public userService: UserService) {
    this.isCollapsed = false;
  }

  ngOnInit() {
  }

}
