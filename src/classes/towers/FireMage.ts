import shortUUID from "short-uuid";
import { timeHasPassed } from "../../utils/timeHasPassed";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
  TowerState,
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
    damage: 20,
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

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FireMage.config);
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
      this.removeProjectile
    );
  };

  update = () => {
    this.updateFrames();

    if (this.state === TowerState.ATTACK) {
      this.attackAnimation();

      this.shootAtAttackAnimationFrame(0, () => this.getProjectile());
    }

    if (this.state === TowerState.IDLE) {
      this.idleAnimation();

      if (timeHasPassed(this.lastAttack, this.attackSpeedThrottleTime)) {
        this.checkAndSetClosestEnemyInRange();
      }
    }

    if (this.showRange) {
      this.drawRange();
    }

    this.updateProjectiles();
  };
}
