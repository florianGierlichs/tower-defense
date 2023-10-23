import { EnemyConfig } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";

export class Demon extends Enemy {
  static readonly config: EnemyConfig = {
    id: "demon",
    name: "Demon",
    health: 700,
    speed: 1,
    maxSlowPercentage: 0,
    special: {
      description: "Immune to slow effects",
    },
    sWidth: 110,
    sHeight: 110,
    imageScale: 0.8,
    imageTranslateCorrection: {
      x: 15,
      y: -25,
    },
    frameConfig: {
      move: {
        frames: 12,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1210,
          sy: 110,
        },
      },
    },
    bountyGold: 100,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Demon.config);
  }
}
