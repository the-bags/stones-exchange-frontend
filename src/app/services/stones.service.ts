import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

interface IStone {
  name: string;
  color: string;
  x: number;
  y: number;
  background: ImageData;
  drag: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class StonesService {

  SERVER_URL: string;

  stones: IStone[];
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stoneRadius = 10;
  stone: IStone;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.SERVER_URL = 'http://localhost:8001';
  }

  getStones() {
    return new Promise(resolve => {
      const self = this;
      if (!this.stones) {
        this.http.post(this.SERVER_URL + '/stones', {
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

  initSpace(canvasRef: ElementRef) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }
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

  writeMessage(message, x, y) {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = '18pt Calibri';
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(message, x, y);
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
  }

  inventoryShow() {
    const x = 10;
    let y = 40;
    this.stones.forEach((stone: IStone) => {
      y += this.stoneRadius * 2 + 10;
      stone.x = x;
      stone.y = y;
      stone.drag = false;
      this.putStone(stone);
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
