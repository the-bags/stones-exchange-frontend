import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:8002';



@Injectable()
export class SocketService {
    private socket: any;
    private host: string =  SERVER_URL;

    constructor() {
      this.socket = io(this.host);
      this.socket.on('connect', () => this.connected());
      this.socket.on('disconnect', () => this.disconnected());
      this.socket.on('error', (error: string) => {
          console.log(`ERROR: "${error}" (${this.host})`);
      });
    }

    connect () {
      this.socket.connect();
    }
    disconnect () {
          this.socket.disconnect();
    }

    emit(chanel: string, message: any) {
      return new Observable<any>(observer => {
          this.socket.emit(chanel, message, function (data) {
              if (data.success) {
                  // Успех
                  observer.next(data.msg);
              } else {
                  // Что-то пошло не так
                  observer.error(data.msg);
              }
              observer.complete();
          });
      });
  }

  on(event_name) {
    console.log(`listen to ${event_name}:`);
    return new Observable<any>(observer => {
        this.socket.off(event_name);
        this.socket.on(event_name, (data) => {
            observer.next(data);
        });
    });
  }
  private connected() {
      console.log('Connected');
  }
  private disconnected() {
      console.log('Disconnected');
  }

}
