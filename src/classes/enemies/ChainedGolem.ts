import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class ChainedGolem extends Enemy {
  static readonly config: EnemyConfig = {
    id: "chainedGolem",
    name: "Chained Golem",
    health: 180,
    speed: 1.3,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.1,
    imageTranslateCorrection: {
      x: -2,
      y: -12,
    },
    frameConfig: {
      move: {
        frames: 7,
        animationIterationCircleTime: 800,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 384,
          sy: 64,
        },
      },
    },
    bountyGold: 10,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, ChainedGolem.config);
  }
}
