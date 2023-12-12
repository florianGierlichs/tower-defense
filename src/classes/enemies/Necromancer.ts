import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class Necromancer extends Enemy {
  static readonly config: EnemyConfig = {
    id: "necromancer",
    name: "Necromancer",
    health: 360,
    speed: 2,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: -15,
    },
    frameConfig: {
      move: {
        frames: 10,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 576,
          sy: 64,
        },
      },
    },
    bountyGold: 15,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Necromancer.config);
  }
}
