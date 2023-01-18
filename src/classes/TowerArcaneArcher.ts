import arcaneArcher from "../assets/arcaneArcher.png";
import { loadImage } from "../utils/loadImage";
import { ImgConfigs, Tower } from "./Tower";

const imageConfigs: ImgConfigs = {
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

let arcaneArcherImage: HTMLImageElement; // todo potentiell race condition problem, because async
(async () => {
  arcaneArcherImage = await loadImage(arcaneArcher);
})();

const arcaneArcherRange = 150;
const arcaneArcherAttackSpeed = 1000;

export class TowerArcaneArcher extends Tower {
  constructor(id: string, x: number, y: number) {
    super(
      id,
      x,
      y,
      arcaneArcherImage,
      imageConfigs,
      arcaneArcherRange,
      arcaneArcherAttackSpeed
    );
  }
}
