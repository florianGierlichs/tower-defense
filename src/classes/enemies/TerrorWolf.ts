import { EnemyConfig } from "../../utils/types";
import { Enemy } from "./Enemy";

export class TerrorWolf extends Enemy {
  static readonly config: EnemyConfig = {
    id: "terrorWolf",
    name: "Terror Wolf",
    health: 130,
    speed: 2.1,
    maxSlowPercentage: 50,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: -5,
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
    bountyGold: 20,
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, TerrorWolf.config);
  }
}
