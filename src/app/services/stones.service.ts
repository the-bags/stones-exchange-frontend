import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

interface IStone {
    name: string;
    color: string;
    x: number;
    y: number;
    background: ImageData;
    drag: boolean;
  }

  interface IPixelPosition {
    x: number;
    y: number;
  }


  @Injectable({
    providedIn: 'root'
  })

  export class StonesService {

    stones: IStone[];
    dragPosition: IPixelPosition;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    stoneRadius = 10;
    stone: IStone;
    grid: {};

    constructor(private authService: AuthService, private http: HttpClient) {
      this.grid = {};
    }

    getStones() {
      return new Promise(resolve => {
        const self = this;
        if (!this.stones) {
          this.http.post(environment.apiUrl + '/stones', {
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
    putStoneGrid(stone: IStone) {
      this.grid[stone.x.toString() + ',' + stone.y.toString()] = stone;
    }
    getStoneGrid(x: number, y: number) {
      return this.grid[x.toString() + ',' + y.toString()];
    }
    removeStoneGrid(stone: IStone) {
      delete this.grid[stone.x.toString() + ',' + stone.y.toString()];
    }

    getMousePos(event) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
    convertCoordStoneToSpace(stone: IStone): IPixelPosition {
      return {
        x: stone.x * this.stoneRadius * 2 + 10,
        y: stone.y * this.stoneRadius * 2 + 10,
      };
    }
    convertCoordSpaceToStone(position: IPixelPosition) {
      return {
        x: Math.round((position.x - 10) / (this.stoneRadius * 2)),
        y: Math.round((position.y - 10) / (this.stoneRadius * 2))
      };
    }
    clearStone(stone: IStone, position: IPixelPosition) {
      this.ctx.putImageData(stone.background, position.x - this.stoneRadius, position.y - this.stoneRadius);
    }

    writeMessage(message, x, y) {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '18pt Calibri';
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(message, x, y);
    }

    putStone(stone: IStone) {
      this.drawStone(stone, this.convertCoordStoneToSpace(stone));
    }

    drawStone(stone: IStone, position: IPixelPosition) {
      stone.background = this.ctx.getImageData(
      position.x - this.stoneRadius,
      position.y - this.stoneRadius,
      this.stoneRadius * 2,
      this.stoneRadius * 2);
      this.ctx.beginPath();
      if ( stone === null ) { return; }
      this.ctx.arc(position.x, position.y, this.stoneRadius, 0, 2 * Math.PI);
      this.ctx.fillStyle = stone.color;
      this.ctx.fill();
    }

    inventoryShow() {
      const x = 1;
      let y = 1;
      this.stones.forEach((stone: IStone) => {
        y += 2;
        stone.x = x;
        stone.y = y;
        this.putStoneGrid(stone);
        stone.drag = false;
        this.putStone(stone);
      });
    }
    stoneTake(event) {
      if (this.stone) {
        this.stone.drag = false;
      }
      const mous = this.convertCoordSpaceToStone(this.getMousePos(event));
      if (this.getStoneGrid(mous.x, mous.y)) {
        this.stone = this.getStoneGrid(mous.x, mous.y);
        this.stone.drag = true;
        this.dragPosition = this.convertCoordStoneToSpace(this.stone);
      }
    }
    stoneDrop(event) {
      if (!this.stone || !this.stone.drag) { return; }
      this.clearStone(this.stone, this.dragPosition);
      const mouse = this.convertCoordSpaceToStone(this.getMousePos(event));
      if (this.getStoneGrid(mouse.x, mouse.y)) {
        this.putStone(this.stone);
        this.putStoneGrid(this.stone);
      } else {
        this.removeStoneGrid(this.stone);
        this.stone.x = mouse.x;
        this.stone.y = mouse.y;
        this.putStone(this.stone);
        this.putStoneGrid(this.stone);
      }
      this.stone.drag = false;
    }
    stoneDrag(event) {
      if (!this.stone || !this.stone.drag) { return; }
      this.clearStone(this.stone, this.dragPosition);
      this.dragPosition = this.getMousePos(event);
      this.drawStone(this.stone, this.dragPosition);
    }

  }

