import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StonesService } from '../../../services/stones.service';

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

  constructor(public stonesService: StonesService) { }


  async ngOnInit() {
    await this.stonesService.getStones();
    this.stonesService.initSpace(this.canvasRef);
    this.stonesService.writeMessage(this.title, 10, 20);
    this.stonesService.inventoryShow();
  }

}
