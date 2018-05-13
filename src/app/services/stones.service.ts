import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

interface IStone {
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})

export class StonesService {

  stones: [IStone];
  constructor(private authService: AuthService, private http: HttpClient) { }

  getStones() {
    return new Promise(resolve => {
      const self = this;
      if (!this.stones) {
        this.http.post('http://localhost:3001/stones', {
          email: this.authService.user.email
        }).subscribe((res: [IStone]) => {
          self.stones = res;
          resolve(self.stones);
        });
      } else {
         resolve(self.stones);
      }
    });

  }
}
