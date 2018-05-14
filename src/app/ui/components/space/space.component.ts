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
  stones: IStone[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stoneRadius = 10;
  stone: IStone;

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(private stonesService: StonesService) { }

  writeMessage(message, x, y) {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '18pt Calibri';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(message, x, y);
  }
  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  putStone(stone: IStone) {
    stone.background = this.ctx.getImageData(
    stone.x - this.stoneRadius - 5,
    stone.y - this.stoneRadius - 5,
    this.stoneRadius * 2 + 5,
    this.stoneRadius * 2 + 5);
    this.ctx.beginPath();
    if ( stone === null ) { return; }
    this.ctx.arc(stone.x, stone.y, this.stoneRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = stone.color;
    this.ctx.fill();
    return stone;
  }
  clearStone(stone: IStone) {
    this.ctx.putImageData(stone.background, stone.x - this.stoneRadius - 5, stone.y - this.stoneRadius - 5);
  }

  async ngOnInit() {
    this.stones = <[IStone]> await this.stonesService.getStones();
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.writeMessage(this.title, 10, 20);
    const x = 10;
    let y = 40;
    this.stones.forEach((stone: IStone) => {
      y += this.stoneRadius * 2 + 10;
      stone.x = x;
      stone.y = y;
      stone.drag = false;
      stone = this.putStone(stone);
    });
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
    this.stone = this.putStone(this.stone);
    this.stone.drag = false;
  }
  stoneDrag(event){
    if (!this.stone || !this.stone.drag) { return; }
    this.clearStone(this.stone);
    this.stone.x = this.getMousePos(event).x;
    this.stone.y = this.getMousePos(event).y;
    this.stone = this.putStone(this.stone);
  }
}
