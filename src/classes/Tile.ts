import { dom } from "../main";

export interface TileCoords {
  sx: number;
  sy: number;
}

export class Tile {
  id;
  x;
  y;
  width: number = 64;
  height: number = 64;

  sWidth: number = 64;
  sHeight: number = this.sWidth;
  dWidth: number = 64;
  dHeight: number = this.dWidth;
  dX: number;
  dY: number;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.dX = x;
    this.dY = y;
  }

  drawDebug = () => {
    dom.ctxBackground.lineWidth = 0.1;
    dom.ctxBackground.strokeStyle = "black";
    dom.ctxBackground.font = " 10px sans-serif";
    dom.ctxBackground.fillStyle = "white";
    dom.ctxBackground.beginPath();
    dom.ctxBackground.strokeRect(this.x, this.y, this.width, this.height);
    dom.ctxBackground.fillText(`${this.id}`, this.x + 5, this.y + 10);
    dom.ctxBackground.fillText(
      `X:${this.x}-${this.x + 64}`,
      this.x + 5,
      this.y + 30
    );
    dom.ctxBackground.fillText(
      `Y:${this.y} ${this.y + 64}`,
      this.x + 5,
      this.y + 50
    );
  };
}
