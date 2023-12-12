import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class SkeletonWarrior extends Enemy {
  static readonly config: EnemyConfig = {
    id: "skeletonWarrior",
    name: "Skeleton Warrior",
    health: 310,
    speed: 1.5,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.1,
    imageTranslateCorrection: {
      x: -4,
      y: -15,
    },
    frameConfig: {
      move: {
        frames: 11,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 640,
          sy: 64,
        },
      },
    },
    bountyGold: 15,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, SkeletonWarrior.config);
  }
}
