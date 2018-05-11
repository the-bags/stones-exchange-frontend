import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {

  @Input() test: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (password === confirmPassword) {
      this.authService.register({
        name,
        email,
        password
      });
    }

    console.log(this.test);
  }

}
