import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class Goblin extends Enemy {
  static readonly config: EnemyConfig = {
    id: "goblin",
    name: "Greedy Goblin",
    health: 35,
    speed: 3,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.1,
    imageTranslateCorrection: {
      x: -5,
      y: -25,
    },
    frameConfig: {
      move: {
        frames: 8,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 64,
        },
        animationStartLeft: {
          sx: 192,
          sy: 320,
        },
      },
    },
    bountyGold: 5,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Goblin.config);
  }
}
