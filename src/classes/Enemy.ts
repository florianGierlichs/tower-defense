import { ctx, game } from "../main";
import { PathNodes } from "./Game";

export class Enemy {
  id;
  x;
  y;
  pathNodes;
  width: number = 20;
  height: number = 20;
  color: string = "yellow";
  health: number = 5;
  nodeIndex: number = 0;
  currentNodeTarget: PathNodes;
  nextNodeTarget: PathNodes;

  constructor(id: number, x: number, y: number, pathNodes: PathNodes[]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.pathNodes = pathNodes;
    this.currentNodeTarget = pathNodes[this.nodeIndex];
    this.nextNodeTarget = pathNodes[this.nodeIndex + 1];
  }

  private draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  private move = () => {
    // if path end for enemy
    if (this.pathNodes.length === this.nodeIndex + 1) {
      game.enemies.remove(this.id);
      return;
    }

    // Remove magic numbers
    // maybe switch case here

    if (this.x < this.currentNodeTarget.x) {
      this.x += 1;
    } else if (this.y > this.nextNodeTarget.y) {
      this.y -= 1;
    } else if (this.y < this.nextNodeTarget.y) {
      this.y += 1;
    } else {
      this.nodeIndex++;
      this.currentNodeTarget = this.pathNodes[this.nodeIndex];
      this.nextNodeTarget = this.pathNodes[this.nodeIndex + 1];
    }
  };

  update = () => {
    this.draw();
    this.move();
  };
}
