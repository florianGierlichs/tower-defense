import { ctxBackground } from "../main";
import textures from "../assets/textures.png";

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

  image: HTMLImageElement;
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

    this.image = new Image(64, 64);
    this.dX = x;
    this.dY = y;
  }

  buildImg = async (drawImg: () => void) => {
    this.image.src = textures;

    await this.image.decode();
    drawImg();
  };

  drawDebug = () => {
    ctxBackground.lineWidth = 0.1;
    ctxBackground.strokeStyle = "black";
    ctxBackground.font = " 10px sans-serif";
    ctxBackground.fillStyle = "white";
    ctxBackground.beginPath();
    ctxBackground.strokeRect(this.x, this.y, this.width, this.height);
    ctxBackground.fillText(`${this.id}`, this.x + 5, this.y + 10);
    ctxBackground.fillText(
      `X:${this.x}-${this.x + 64}`,
      this.x + 5,
      this.y + 30
    );
    ctxBackground.fillText(
      `Y:${this.y} ${this.y + 64}`,
      this.x + 5,
      this.y + 50
    );
  };
}
