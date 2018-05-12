import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';

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

  onSubmit(credentials: NgForm) {
    this.authService.register(credentials.value);
  }

  isConfirm(credentials: NgForm) {
    return credentials.value.password === credentials.value.confirm 
           && credentials.value.password !== '';
  }

}
