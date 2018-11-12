import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { StonesService } from './../services/stones.service';
import { SocketService } from './../services/socket.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})

export class WorkspaceComponent implements OnInit {

  title = 'Stone space';
  stonesInventory;

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(
    public stonesService: StonesService,
    public socket: SocketService) {
  }


  async ngOnInit() {
    this.stonesService.getStones()
    .subscribe(stones => {
      this.stonesInventory = stones;
    }
      );
    this.stonesService.initSpace(this.canvasRef);
    this.stonesService.writeMessage(this.title, 10, 20);
    // this.stonesService.inventoryShow();
  }

}
