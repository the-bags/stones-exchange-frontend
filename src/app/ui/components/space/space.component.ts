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

  @ViewChild('canvas') canvasRef: ElementRef;

  constructor(private stonesService: StonesService) { }

  async ngOnInit() {
    this.stones = await this.stonesService.getStones();
    console.log(this.stones);
    const ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.font = '20px Georgia';
    ctx.fillText(this.title, 10, 20);
    let y = 40;
    this.stones.forEach((stone: IStone) => {
      ctx.beginPath();
      ctx.arc(40, y += 20, 10, 0, 2 * Math.PI);
      ctx.fillStyle = stone.color;
      ctx.fill();
    });
    ctx.beginPath();
}

}
