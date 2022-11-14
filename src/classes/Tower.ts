import { ctx } from "../main";
import { Projectile } from "./Projectile";

export class Tower {
  x: number;
  y: number;
  width: number = 24;
  height: number = 24;
  distance: number = 100;
  color: string = "green";
  projectiles: Projectile[] = [];

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private draw = () => {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  };

  update = () => {
    this.draw();
  };
}
