import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class BloodyBat extends Enemy {
  static readonly config: EnemyConfig = {
    id: "bloodyBat",
    name: "Bloody Bat",
    health: 130,
    speed: 2,
    maxSlowPercentage: 50,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.2,
    imageTranslateCorrection: {
      x: -5,
      y: -10,
    },
    frameConfig: {
      move: {
        frames: 8,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 448,
          sy: 64,
        },
      },
    },
    bountyGold: 20,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, BloodyBat.config);
  }
}
