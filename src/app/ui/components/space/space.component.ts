import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StonesService } from '../../../services/stones.service';

interface IStone {
  name: string;
  color: string;
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

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(private stonesService: StonesService) {}

  writeMessage(message) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '18pt Calibri';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(message, 10, 25);
  }
  getMousePos(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  async ngOnInit() {
    this.stones = <[IStone]> await this.stonesService.getStones();
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    console.log(this.stones);

    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Georgia';
    this.ctx.fillText(this.title, 10, 20);
    let y = 40;
    this.stones.forEach((stone: IStone) => {
      this.ctx.beginPath();
      this.ctx.arc(40, y += 20, 10, 0, 2 * Math.PI);
      this.ctx.fillStyle = stone.color;
      this.ctx.fill();
    });
    this.ctx.beginPath();
    const self = this;

    this.canvas.addEventListener('mousemove', function(evt) {
      const mousePos = self.getMousePos(evt);
      const message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
      self.writeMessage(message);
    }, false);
  }
}
