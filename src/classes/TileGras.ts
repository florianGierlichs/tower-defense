import { dom, imageController } from "../main";
import { Tile, TileCoords } from "./Tile";
import { getRandomItemFromArray } from "../utils/getRandomItemFromArray";
import { getTileMiddle } from "../utils/getTileMiddle";
import { TowerConfig } from "../data/towerConfig";

export class TileGras extends Tile {
  hasTower: boolean = false;
  showTowerBP: TowerConfig | null = null;

  image: HTMLImageElement;
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

  setShowTowerBp = (tower: TowerConfig | null) => {
    this.showTowerBP = tower;
  };

  private drawTowerBp = () => {
    if (this.showTowerBP !== null) {
      const image = imageController.getImage(this.showTowerBP);
      dom.ctxGame.drawImage(image, this.dX, this.dY);

      const tileMiddle = getTileMiddle({ x: this.x, y: this.y });
      dom.ctxGame.beginPath();
      dom.ctxGame.arc(
        tileMiddle.x,
        tileMiddle.y,
        this.showTowerBP.range,
        0,
        Math.PI * 2
      );
      dom.ctxGame.fillStyle = "rgba(225,225,225,0.1)";
      dom.ctxGame.fill();
    }
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
