import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class Mushroom extends Enemy {
  static readonly config: EnemyConfig = {
    id: "mushroom",
    name: "Mad Mushroom",
    health: 25,
    speed: 2,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: -20,
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
    super(id, x, y, Mushroom.config);
  }
}
