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
  constructor(id: string, x: number, y: number) {
    super(id, x, y, arcaneArcherImage, imageConfigs);
  }
}
