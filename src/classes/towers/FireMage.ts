import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
} from "../../utils/types";
import { Tower } from "./Tower";

export class FireMage extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.FIRE_MAGE,
    range: 100,
    attackSpeed: 1000,
    imageScale: 0.8,
    frameConfig: {
      idle: {
        frames: 4,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 448,
          sy: 128,
        },
      },
      attack: {
        frames: 4,
        animationIterationCircleTime: 500,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 64,
        },
        animationStartLeft: {
          sx: 448,
          sy: 192,
        },
      },
    },
    projectile: {
      id: ProjectileId.FIRE_MAGE,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.FIRE_MAGE,
    },
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FireMage.config);
  }
}