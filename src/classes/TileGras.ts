import { dom, imageController } from "../main";
import { Tile, TileCoords } from "./Tile";
import { getRandomItemFromArray } from "../utils/getRandomItemFromArray";
import { TowerName } from "./Game";

export class TileGras extends Tile {
  hasTower: boolean = false;
  showTowerBP: TowerName | null = null;

  image: HTMLImageElement | null = null;
  sX: number;
  sY: number;

  towerBpImage: HTMLImageElement | null = null;

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

    this.image = imageController.getImage("textures");
    this.sX = this.getImgConfig().sx;
    this.sY = this.getImgConfig().sy;
  }

  private getImgConfig = () => {
    return getRandomItemFromArray(this.tileGrasCoords);
  };

  private drawImg = () => {
    if (this.image !== null) {
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
    }
  };

  setHasTower = () => (this.hasTower = true);

  setShowTowerBp = (tower: TowerName | null) => {
    this.showTowerBP = tower;
  };

  private drawTowerBp = () => {
    dom.ctxGame.save();
    dom.ctxGame.globalAlpha = 0.5;
    if (this.showTowerBP !== null) {
      const image = imageController.getImage(this.showTowerBP);
      if (image !== null) {
        dom.ctxGame.drawImage(
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
    }
    dom.ctxGame.restore();
  };

  updateBG = () => {
    this.drawImg();
  };

  update = () => {
    if (this.showTowerBP !== null) {
      this.drawTowerBp();
    }
  };
}
