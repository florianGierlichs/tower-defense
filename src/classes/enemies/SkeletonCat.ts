import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class SkeletonCat extends Enemy {
  static readonly config: EnemyConfig = {
    id: "skeletonCat",
    name: "Skeleton Cat",
    health: 260,
    speed: 2,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.2,
    imageTranslateCorrection: {
      x: -7,
      y: -20,
    },
    frameConfig: {
      move: {
        frames: 8,
        animationIterationCircleTime: 600,
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
    bountyGold: 15,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, SkeletonCat.config);
  }
}
