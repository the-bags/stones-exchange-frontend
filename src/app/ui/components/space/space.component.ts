import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StonesService } from '../../../services/stones.service';
import { SocketService } from '../../../services/socket.service';

interface IStone {
  name: string;
  color: string;
  x: number;
  y: number;
  background: ImageData;
  drag: boolean;
}


@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})

export class SpaceComponent implements OnInit {

  title = 'Stone space';


  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(public stonesService: StonesService, public socket: SocketService) { 

    this.socket.emit('say_for_server', 'Hello Server').subscribe(
      (data) => {
          console.log('Success', data);
      },
      (error) => {
          console.log('Error', error);
      },
      () => {
          console.log('complete');
      }
  );

    this.socket.on('customEmit').subscribe((data) => {
      console.log(data);
    });

  }


  async ngOnInit() {
    await this.stonesService.getStones();
    this.stonesService.initSpace(this.canvasRef);
    this.stonesService.writeMessage(this.title, 10, 20);
    this.stonesService.inventoryShow();
  }

}
