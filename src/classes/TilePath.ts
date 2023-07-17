import { dom, imageController } from "../main";
import { Tile, TileCoords } from "./Tile";
import { getRandomItemFromArray } from "../utils/getRandomItemFromArray";

type Direction = "horizontal" | "vertical" | "corner";

export class TilePath extends Tile {
  sX: number;
  sY: number;

  horizontalTilePathsCoords: TileCoords[] = [
    { sx: 2 * this.sWidth, sy: 2 * this.sHeight },
    { sx: 3 * this.sWidth, sy: 2 * this.sHeight },
  ];
  verticalTilePathsCoords: TileCoords[] = [
    { sx: 1 * this.sWidth, sy: 2 * this.sHeight },
    { sx: 1 * this.sWidth, sy: 3 * this.sHeight },
  ];
  cornerTilePathCoords: TileCoords = {
    sx: 0 * this.sWidth,
    sy: 2 * this.sHeight,
  };
  direction: Direction;

  constructor(id: number, x: number, y: number, direction: Direction) {
    super(id, x, y);

    this.direction = direction;

    this.sX = this.getImgConfig().sx;
    this.sY = this.getImgConfig().sy;
  }

  private getImgConfig = () => {
    let imageConfig: TileCoords;
    switch (this.direction) {
      case "horizontal":
        imageConfig = getRandomItemFromArray(this.horizontalTilePathsCoords);
        break;
      case "vertical":
        imageConfig = getRandomItemFromArray(this.verticalTilePathsCoords);
        break;
      default:
        imageConfig = this.cornerTilePathCoords;
    }
    return imageConfig;
  };

  private drawImg = () => {
    const image = imageController.getImage("textures");
    if (image !== null) {
      dom.ctxBackground.drawImage(
        image,
        this.sX,
        this.sY,
        this.sWidth,
        this.sHeight,
        this.dX,
        this.dY,
        this.dWidth,
        this.dHeight
      );
    }
  };

  updateBG = () => {
    this.drawImg();
  };
}
