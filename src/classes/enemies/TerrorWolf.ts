import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class TerrorWolf extends Enemy {
  static readonly config: EnemyConfig = {
    id: "terrorWolf",
    name: "Terror Wolf",
    health: 160,
    speed: 2.5,
    maxSlowPercentage: 60,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: -5,
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
    bountyGold: 10,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, TerrorWolf.config);
  }
}
