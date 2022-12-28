import { ctxBackground } from "../main";
import { Tile } from "./Tile";
import textures from "../assets/textures.png";
import { getRandomItemFromArray } from "../utils/getRandomItemFromArray";

type Direction = "horizontal" | "vertical" | "corner";

interface TilePathCoords {
  sx: number;
  sy: number;
}

export class TilePath extends Tile {
  image: HTMLImageElement;
  sX: number;
  sY: number;
  sWidth: number = 64;
  sHeight: number = this.sWidth;
  dX: number;
  dY: number;
  dWidth: number = 64;
  dHeight: number = this.dWidth;
  tileSetLength: number = 4;
  horizontalTilePaths: TilePathCoords[] = [
    { sx: 2 * this.sWidth, sy: 2 * this.sHeight },
    { sx: 3 * this.sWidth, sy: 2 * this.sHeight },
  ];
  verticalTilePaths: TilePathCoords[] = [
    { sx: 1 * this.sWidth, sy: 2 * this.sHeight },
    { sx: 1 * this.sWidth, sy: 3 * this.sHeight },
  ];
  cornerTilePath: TilePathCoords = {
    sx: 0 * this.sWidth,
    sy: 2 * this.sHeight,
  };
  direction: Direction;

  constructor(id: number, x: number, y: number, direction: Direction) {
    super(id, x, y);

    this.direction = direction;
    this.dX = x;
    this.dY = y;

    this.image = new Image(64, 64);

    this.sX = this.getImgConfig().sx;
    this.sY = this.getImgConfig().sy;
  }

  private getImgConfig = () => {
    let imageConfig: TilePathCoords;
    switch (this.direction) {
      case "horizontal":
        imageConfig = getRandomItemFromArray(this.horizontalTilePaths);
        break;
      case "vertical":
        imageConfig = getRandomItemFromArray(this.verticalTilePaths);
        break;
      default:
        imageConfig = this.cornerTilePath;
    }
    return imageConfig;
  };

  private buildImg = async () => {
    this.image.src = textures;

    await this.image.decode();
    this.drawImg();
  };

  private drawImg = () => {
    ctxBackground.drawImage(
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

  update = () => {
    this.buildImg();
  };
}
