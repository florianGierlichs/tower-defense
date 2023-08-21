import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class SkeletonShield extends Enemy {
  static readonly config: EnemyConfig = {
    name: "skeletonShield",
    health: 3,
    speed: 2,
    imageScale: 0.8,
    frameConfig: {
      move: {
        frames: 4,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 64,
        },
        animationStartLeft: {
          sx: 192,
          sy: 384,
        },
      },
    },
    bountyGold: 10,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, SkeletonShield.config);
  }
}
