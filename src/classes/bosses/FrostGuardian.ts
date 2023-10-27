import { EnemyConfig } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";

export class FrostGuardian extends Enemy {
  static readonly config: EnemyConfig = {
    id: "frostGuardian",
    name: "Frost Guardian",
    health: 1500,
    speed: 2,
    maxSlowPercentage: 50,
    special: {
      description: "Chance to freeze tower",
    },
    sWidth: 128,
    sHeight: 128,
    imageScale: 0.8,
    imageTranslateCorrection: {
      x: 12,
      y: -15,
    },
    frameConfig: {
      move: {
        frames: 10,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1152,
          sy: 128,
        },
      },
    },
    bountyGold: 300,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FrostGuardian.config);
  }
}
