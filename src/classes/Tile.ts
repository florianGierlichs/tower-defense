import { ctx } from "../main";

export class Tile {
  id;
  x;
  y;
  width: number = 64;
  height: number = 64;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  private draw = () => {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.strokeText(`${this.id}`, this.x + 10, this.y + 10);
    ctx.strokeText(`${this.x}-${this.x + 64}`, this.x + 10, this.y + 30);
    ctx.strokeText(`${this.y} ${this.y + 64}`, this.x + 10, this.y + 50);
  };

  update = () => {
    this.draw();
  };
  log = () => {
    console.log("this tile", this);
  };
}
