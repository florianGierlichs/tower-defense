import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class FireWorm extends Enemy {
  static readonly config: EnemyConfig = {
    id: "fireWorm",
    health: 30,
    speed: 2,
    maxSlowPercentage: 20,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: -10,
    },
    frameConfig: {
      move: {
        frames: 9,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 512,
          sy: 192,
        },
      },
    },
    bountyGold: 30,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FireWorm.config);
  }
}
