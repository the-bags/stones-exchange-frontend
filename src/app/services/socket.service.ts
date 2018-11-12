import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import * as io from 'socket.io-client';

import { environment } from '../../environments/environment';


@Injectable()
export class SocketService {
    private socket: any;

    constructor() {
      this.socket = io(environment.socketUrl);
      this.socket.on('connect', () => this.connected());
      this.socket.on('disconnect', () => this.disconnected());
      this.socket.on('error', (error: string) => {
          console.log(`ERROR: "${error}" (${environment.socketUrl})`);
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
                  observer.next(data.msg);
              } else {
                  observer.error(data.msg);
              }
              observer.complete();
          });
      });
  }

  on(event_name) {
    return new Observable<any>(observer => {
      //  this.socket.off(event_name);
        this.socket.on(event_name, (data) => {
            observer.next(data);
        });
    });
  }
  private connected() {
  }
  private disconnected() {
  }

}
