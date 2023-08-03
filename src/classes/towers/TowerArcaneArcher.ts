import { TowerConfig } from "../../utils/types";
import { Tower } from "./Tower";

export class TowerArcaneArcher extends Tower {
  // todo rename to ArcaneArcher
  static readonly config: TowerConfig = {
    name: "arcaneArcher",
    range: 250,
    attackSpeed: 1000,
    imageScale: 0.8,
    frameConfig: {
      idle: {
        frames: 4,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 4,
        animationStartRight: {
          sx: 0,
          sy: 320,
        },
        animationStartLeft: {
          sx: 448,
          sy: 832,
        },
      },
      attack: {
        frames: 7,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 1,
        animationStartRight: {
          sx: 0,
          sy: 192,
        },
        animationStartLeft: {
          sx: 448,
          sy: 704,
        },
      },
    },
    projectile: {
      name: "arcaneArcherProjectile",
      width: 40,
      height: 5,
    },
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, TowerArcaneArcher.config);
  }
}
