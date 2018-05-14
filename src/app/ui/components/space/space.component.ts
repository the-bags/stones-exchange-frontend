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

  constructor(private stonesService: StonesService) { }


  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  clearStone(stone: IStone) {
    this.ctx.putImageData(stone.background, stone.x - this.stoneRadius - 5, stone.y - this.stoneRadius - 5);
  }

  async ngOnInit() {
    await this.stonesService.getStones();
    this.stonesService.initSpace(this.canvasRef);
    this.stonesService.writeMessage(this.title, 10, 20);
    this.stonesService.inventoryShow();
  }

  stoneTake(event) {
    if (this.stone) {
      this.stone.drag = false;
    }
    const self = this;
    this.stones.forEach((stone: IStone) => {
      const mousePos = self.getMousePos(event);
      if (Math.pow(mousePos.x - stone.x, 2) + Math.pow(mousePos.y - stone.y, 2) < Math.pow(self.stoneRadius, 2)) {
        this.stone = stone;
        this.stone.drag = true;
      }
    });
  }
  stoneDrop(event) {
    if (!this.stone || !this.stone.drag) { return; }
    this.clearStone(this.stone);
    this.stone.x = this.getMousePos(event).x;
    this.stone.y = this.getMousePos(event).y;
    this.putStone(this.stone);
    this.stone.drag = false;
  }
  stoneDrag(event){
    if (!this.stone || !this.stone.drag) { return; }
    this.clearStone(this.stone);
    this.stone.x = this.getMousePos(event).x;
    this.stone.y = this.getMousePos(event).y;
    this.putStone(this.stone);
  }
}
