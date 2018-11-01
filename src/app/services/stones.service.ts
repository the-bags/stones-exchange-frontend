import { Injectable, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';

interface IStone {
  id: string;
  _id: string;
  name: string;
  color: string;
  x: number;
  y: number;
  background: ImageData;
  drag: boolean;
  email: string;
}

interface IPixelPosition {
  x: number;
  y: number;
}


@Injectable({
  providedIn: 'root'
})

export class StonesService implements OnInit {

  stonesInventory: IStone[];
  dragPosition: IPixelPosition;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stoneRadius = 10;
  // Current stone when is dragging
  stone: IStone;
  // Map for monitoring the position of stones, giving quick access
  map: Map<string, IStone>;
  background: Map<string, ImageData>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private http: HttpClient,
    public socket: SocketService
  ) {
    this.map = new Map();
    this.background = new Map();
    this.socket.on('broadcast').subscribe((data) => {
      console.log('Success', data);
    },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      });
    this.socket.on('drop_stone').subscribe((stone) => {
      /*if (stone.email !== this.authService.user.email) {*/
      this.clearStone(stone, this.convertCoordStoneToSpace(stone));
      this.putStone(stone);
      this.putStoneGrid(stone);
      console.log('Drop', stone, this.convertCoordStoneToSpace(stone));
      /*}*/
    });
    this.socket.on('take_stone').subscribe((stone) => {
      if (stone.x > 1) {
        /*if (stone.email !== this.authService.user.email) {*/
        this.removeStoneGrid(stone);
        this.clearStone(stone, this.convertCoordStoneToSpace(stone));
        /* }*/
      }
    });
  }

  ngOnInit(): void {

  }
  getStones() {
    return new Promise(resolve => {
      const self = this;
      if (!this.stonesInventory) {
        this.http.post(environment.apiUrl + '/stones', {
          email: 'admin@test.com'
        }).subscribe((res: [IStone]) => {
          self.stonesInventory = res;
          resolve(self.stonesInventory);
        });
      } else {
        resolve(self.stonesInventory);
      }
    });

  }

  initSpace(canvasRef: ElementRef) {
    this.canvas = canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    this.socket.on('space').subscribe((stones: IStone) => {
      console.log('==>', stones);
      for (const key in stones) {
        if (key) {
          this.clearStone(stones[key], this.convertCoordStoneToSpace(stones[key]));
          console.log(stones[key]);
          this.putStone(stones[key]);
          this.putStoneGrid(stones[key]);
        }
      }
    });
    this.socket.emit('get_space', null).subscribe();
  }
  putStoneGrid(stone: IStone) {
    this.map.set(stone.x.toString() + ',' + stone.y.toString(), stone);
  }
  getStoneGrid(x: number, y: number) {
    return this.map.get(x.toString() + ',' + y.toString());
  }
  removeStoneGrid(stone: IStone) {
    this.map.delete(stone.x.toString() + ',' + stone.y.toString());
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
    const background = this.background.get(stone.id);
    if (background) {
      this.ctx.putImageData(background, position.x - this.stoneRadius, position.y - this.stoneRadius);
    } else {
      const x = position.x - this.stoneRadius;
      const y = position.y - this.stoneRadius;
      this.ctx.clearRect(
        x - 1,
        y - 1,
        this.stoneRadius * 2 + 1,
        this.stoneRadius * 2 + 1);
    }
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
    this.background.set(stone.id, this.ctx.getImageData(
      position.x - this.stoneRadius,
      position.y - this.stoneRadius,
      this.stoneRadius * 2 + 1,
      this.stoneRadius * 2 + 1));
    this.ctx.beginPath();
    if (stone === null) { return; }
    this.ctx.arc(position.x, position.y, this.stoneRadius, 0, 2 * Math.PI);
    this.ctx.fillStyle = stone.color;
    this.ctx.fill();
  }

  inventoryShow() {
    const x = 1;
    let y = 1;
    this.stonesInventory.forEach((stone: IStone) => {
      y += 2;
      stone.id = stone._id + y;
      stone.x = x;
      stone.y = y;
      stone.email = this.userService.getCurrentUser().email;
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
    if (this.getStoneGrid(mous.x, mous.y)
      // The condition for moving your stones
     /* && this.getStoneGrid(mous.x, mous.y).email === this.authService.user.email*/) {
      this.stone = this.getStoneGrid(mous.x, mous.y);
      this.ctx.clearRect(190, 0, 300, 40);
      this.writeMessage('you take ' + this.stone.name, 200, 20);
      this.stone.drag = true;
      this.socket.emit('take_stone', this.stone).subscribe(
        data => {
          console.log('Success', data);
        },
        error => {
          console.log('Error', error);
        },
        () => {
          console.log('complete');
        }
      );
      this.dragPosition = this.convertCoordStoneToSpace(this.stone);
    }
  }
  stoneDrop(event) {
    if (!this.stone || !this.stone.drag) { return; }
    this.clearStone(this.stone, this.dragPosition);
    this.stone.drag = false;
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
    this.socket.emit('drop_stone', this.stone).subscribe(
      data => {
        console.log('Success', data);
      },
      error => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
      }
    );
  }
  stoneDrag(event) {
    if (!this.stone || !this.stone.drag) { return; }
    this.clearStone(this.stone, this.dragPosition);
    this.dragPosition = this.getMousePos(event);
    this.drawStone(this.stone, this.dragPosition);
  }

}

