import { dom } from "../main";
import { Tile, TileCoords } from "./Tile";
import { getRandomItemFromArray } from "../utils/getRandomItemFromArray";

export class TileGras extends Tile {
  hasTower: boolean = false;

  sX: number;
  sY: number;

  tileGrasCoords: TileCoords[] = [
    { sx: 0 * this.sWidth, sy: 0 * this.sHeight },
    { sx: 0 * this.sWidth, sy: 1 * this.sHeight },
    { sx: 1 * this.sWidth, sy: 0 * this.sHeight },
    { sx: 1 * this.sWidth, sy: 1 * this.sHeight },
    { sx: 2 * this.sWidth, sy: 0 * this.sHeight },
    { sx: 2 * this.sWidth, sy: 1 * this.sHeight },
    { sx: 3 * this.sWidth, sy: 0 * this.sHeight },
    { sx: 3 * this.sWidth, sy: 1 * this.sHeight },
  ];

  constructor(id: number, x: number, y: number) {
    super(id, x, y);

    this.sX = this.getImgConfig().sx;
    this.sY = this.getImgConfig().sy;
  }

  private getImgConfig = () => {
    return getRandomItemFromArray(this.tileGrasCoords);
  };

  private drawImg = () => {
    dom.ctxBackground.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.dX,
      this.dY,
      this.dWidth,
      this.dHeight
    );
  };

  setHasTower = () => (this.hasTower = true);

  update = () => {
    this.buildImg(this.drawImg);
  };
}
