import { ctx } from "../main";
import { Enemies } from "./Enemies";
import { Towers } from "./Towers";

export class Game {
  time: number = 0;
  pathNodes: number[][] = [
    [150, 100],
    [150, 400],
    [400, 400],
    [400, 200],
    [500, 200],
    [500, 500],
    [700, 500],
    [700, 0],
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
      ctx.lineTo(node[0], node[1]);
    });
    ctx.stroke();
  };
}
