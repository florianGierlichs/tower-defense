import shortUUID from "short-uuid";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
} from "../../utils/types";
import { Tower } from "./Tower";
import { Flame } from "../projectiles/Flame";

const attackAnimationIterationCircleTime = 800;

export class FireMage extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.FIRE_MAGE,
    name: "Fire Mage",
    description: `Burns a small area for ${
      attackAnimationIterationCircleTime / 1000
    }sec. Slow enemies can get multiple damage ticks.`,
    range: 100,
    attackSpeed: 40,
    damage: 40,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1,
    imageTranslateCorrection: {
      x: 0,
      y: 0,
    },
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
        animationIterationCircleTime: attackAnimationIterationCircleTime,
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
    cancelAttackAnimantionAllowed: false,
    projectile: {
      id: ProjectileId.FIRE_MAGE,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.FIRE_MAGE,
    },
  };

  id;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FireMage.config);
    this.id = id;
  }

  getProjectile = () => {
    if (this.targetFallbackCoordinates === null) {
      throw new Error("No current target");
    }

    return new Flame(
      shortUUID.generate(),
      this.tileMiddle.x,
      this.tileMiddle.y,
      FireMage.config.damage,
      FireMage.config.frameConfig.attack.animationIterationCircleTime,
      this.projectileImg,
      this.currentTarget || this.targetFallbackCoordinates,
      this.animationDirection,
      this.removeProjectile,
      this.id
    );
  };

  update = () => {
    super.update({
      shootAtFrame: 0,
      getProjectile: this.getProjectile,
      cancelProjectile: true,
    });
  };
}
