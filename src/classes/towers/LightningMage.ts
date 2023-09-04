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
import { LightningBolt } from "../projectiles/LightningBolt";

export class LightningMage extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.Lightning_MAGE,
    range: 200,
    attackSpeed: 30,
    damage: 5,
    imageScale: 1,
    frameConfig: {
      idle: {
        frames: 8,
        animationIterationCircleTime: 800,
        flipOffsetFrames: 8,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 960,
          sy: 128,
        },
      },
      attack: {
        frames: 16,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 64,
        },
        animationStartLeft: {
          sx: 960,
          sy: 192,
        },
      },
    },
    cancelAttackAnimantionAllowed: false,
    projectile: {
      id: ProjectileId.LIGHTNING_MAGE,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.LIGHTNING_MAGE,
    },
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, LightningMage.config);
  }

  getProjectile = () => {
    if (this.targetFallbackCoordinates === null) {
      throw new Error("No current target");
    }

    return new LightningBolt(
      shortUUID.generate(),
      this.tileMiddle.x,
      this.tileMiddle.y,
      LightningMage.config.damage,
      this.projectileImg,
      this.currentTarget || this.targetFallbackCoordinates,
      this.removeProjectile
    );
  };

  update = () => {
    this.updateFrames();

    if (this.state === TowerState.ATTACK) {
      this.attackAnimation();
      this.shootAtAttackAnimationFrame(10, () => this.getProjectile());
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
