import { ctx, game } from "../main";
import { getAngle } from "../utils/getAngle";
import { PathNode } from "./Game";

export class Enemy {
  id;
  x;
  y;
  nodeTarget;
  pathNodes;
  angle;
  width: number = 20;
  height: number = 20;
  color: string = "yellow";
  health: number = 5;
  speed: number = 2;
  nodesIndex: number = 0;

  constructor(id: string, x: number, y: number, pathNodes: PathNode[]) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.pathNodes = pathNodes;
    this.nodeTarget = pathNodes[this.nodesIndex];
    this.angle = getAngle(this.x, this.y, this.nodeTarget.x, this.nodeTarget.y);
  }

  private draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  private move = () => {
    // move x
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);

    if (restDistanceX - this.speed < 0) {
      this.x += restDistanceX * Math.cos((this.angle * Math.PI) / 180);
    } else {
      this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    if (restDistanceY - this.speed < 0) {
      this.y += restDistanceY * Math.sin((this.angle * Math.PI) / 180);
    } else {
      this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
    }

    //reach path node
    if (this.x === this.nodeTarget.x && this.y === this.nodeTarget.y) {
      this.nodesIndex++;
      if (this.pathNodes.length === this.nodesIndex) {
        game.enemies.remove(this.id);
        return;
      }
      this.nodeTarget = this.pathNodes[this.nodesIndex];
      this.angle = getAngle(
        this.x,
        this.y,
        this.nodeTarget.x,
        this.nodeTarget.y
      );
    }
  };

  reduceHealth = () => {
    this.health--;
  };

  update = () => {
    this.draw();
    this.move();
  };
}
