import { EnemyConfig } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";

export class DeathWorm extends Enemy {
  static readonly config: EnemyConfig = {
    id: "deathWorm",
    name: "Death Worm",
    health: 800,
    speed: 1.2,
    maxSlowPercentage: 0,
    special: {
      description: "Immune to slow effects",
    },
    sWidth: 224,
    sHeight: 128,
    imageScale: 0.6,
    imageTranslateCorrection: {
      x: 45,
      y: 0,
    },
    frameConfig: {
      move: {
        frames: 11,
        animationIterationCircleTime: 2000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1280,
          sy: 128,
        },
      },
    },
    bountyGold: 100,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, DeathWorm.config);
  }
}
