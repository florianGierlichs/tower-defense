import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class EvilWitch extends Enemy {
  static readonly config: EnemyConfig = {
    id: "evilWitch",
    name: "Evil Witch",
    health: 130,
    speed: 2,
    maxSlowPercentage: 50,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.3,
    imageTranslateCorrection: {
      x: -8,
      y: -20,
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
    super(id, x, y, EvilWitch.config);
  }
}
