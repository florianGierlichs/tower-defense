import arcaneArcher from "../assets/arcaneArcher.png";
import arcaneArcherProjectile from "../assets/arcaneArcherProjectile.png";
import { TOWER_CONFIGS } from "../data/towerConfig";
import { loadImage } from "../utils/loadImage";
import { ImgConfigs, Tower } from "./Tower";

const imageConfigs: ImgConfigs = {
  // todo rename type and put to utils/types
  // todo put to data
  idle: {
    frames: 4,
    animationIterationCircleTime: 500,
    flipOffsetFrames: 4,
    animationStartRight: {
      sx: 0,
      sy: 320,
    },
    animationStartLeft: {
      sx: 448,
      sy: 832,
    },
  },
  attack: {
    frames: 7,
    animationIterationCircleTime: 500,
    flipOffsetFrames: 1,
    animationStartRight: {
      sx: 0,
      sy: 192,
    },
    animationStartLeft: {
      sx: 448,
      sy: 704,
    },
  },
};

let arcaneArcherImage: HTMLImageElement; // todo potentiell race condition problem, because async, NEW use from imageController
let projectileImg: HTMLImageElement;
(async () => {
  arcaneArcherImage = await loadImage(arcaneArcher);
  projectileImg = await loadImage(arcaneArcherProjectile);
})();

const projectileWidth = 40; // TODO maybe in imageConfigs?
const projectileHeight = 5;

export class TowerArcaneArcher extends Tower {
  constructor(id: string, x: number, y: number) {
    super(
      id,
      x,
      y,
      arcaneArcherImage,
      imageConfigs,
      TOWER_CONFIGS.arcaneArcher.range,
      TOWER_CONFIGS.arcaneArcher.attackSpeed,
      { projectileImg, projectileWidth, projectileHeight }
    );
  }
}
