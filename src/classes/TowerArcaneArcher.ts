import arcaneArcher from "../assets/arcaneArcher.png";
import { loadImage } from "../utils/loadImage";
import { ImgConfigs, Tower } from "./Tower";

const imageConfigs: ImgConfigs = {
  idle: {
    frames: 4,
    sx: 0,
    sy: 320,
  },
  attack: {
    frames: 7,
    sx: 0,
    sy: 192,
  },
};

let arcaneArcherImage: HTMLImageElement;
(async () => {
  arcaneArcherImage = await loadImage(arcaneArcher);
})();

export class TowerArcaneArcher extends Tower {
  image: HTMLImageElement;
  sX: number;
  sY: number;
  frames: number;

  constructor(id: string, x: number, y: number) {
    super(id, x, y);
    this.image = arcaneArcherImage;
    const { sx, sy, frames } = this.getImgConfig(imageConfigs);
    this.sX = sx;
    this.sY = sy;
    this.frames = frames;
  }

  private setSX = () => {
    this.sX = this.setFrame(this.sX, this.frames);
  };

  update = () => {
    this.setSX();
    this.drawImg(this.image, this.sX, this.sY);
    this.updateProperties();
  };
}
