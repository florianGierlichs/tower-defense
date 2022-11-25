import { ctx } from "../main";
import { Enemies } from "./Enemies";
import { Towers } from "./Towers";

export interface PathNodes {
  x: number;
  y: number;
}

export class Game {
  time: number = 0;
  pathNodes: PathNodes[] = [
    { x: 150, y: 100 },
    { x: 150, y: 400 },
    { x: 400, y: 400 },
    { x: 400, y: 200 },
    { x: 500, y: 200 },
    { x: 500, y: 500 },
    { x: 700, y: 500 },
    { x: 700, y: 0 },
  ];

  towers = new Towers();
  enemies = new Enemies(this.pathNodes);

  constructor() {}

  drawPath = () => {
    ctx.beginPath();
    ctx.lineWidth = 20;
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 100);
    this.pathNodes.forEach((node) => {
      ctx.lineTo(node.x, node.y);
    });
    ctx.stroke();
  };
}
