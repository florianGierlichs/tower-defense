import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class Goblin extends Enemy {
  static readonly config: EnemyConfig = {
    id: "goblin",
    health: 3,
    speed: 3,
    maxSlowPercentage: 50,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
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
    bountyGold: 30,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Goblin.config);
  }
}
