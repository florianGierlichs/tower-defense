import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class SkeletonWarrior extends Enemy {
  static readonly config: EnemyConfig = {
    id: "skeletonWarrior",
    name: "Skeleton Warrior",
    health: 100,
    speed: 2,
    maxSlowPercentage: 50,
    sWidth: 22,
    sHeight: 33,
    imageScale: 1.6,
    imageTranslateCorrection: {
      x: -5,
      y: -30,
    },
    frameConfig: {
      move: {
        frames: 13,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 264,
          sy: 33,
        },
      },
    },
    bountyGold: 15,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, SkeletonWarrior.config);
  }
}
