import shortUUID from "short-uuid";
import { timeHasPassed } from "../../utils/timeHasPassed";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
  TowerState,
} from "../../utils/types";
import { Projectile } from "../projectiles/Projectile";
import { Tower } from "./Tower";

export class TowerArcaneArcher extends Tower {
  // todo rename to ArcaneArcher
  static readonly config: TowerConfig = {
    id: TowerId.ARCANE_ARCHER,
    range: 250,
    attackSpeed: 60,
    damage: 10,
    imageScale: 0.8,
    frameConfig: {
      idle: {
        frames: 4,
        animationIterationCircleTime: 600,
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
        animationIterationCircleTime: 400,
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
    cancelAttackAnimantionAllowed: true,
    projectile: {
      id: ProjectileId.ARCANE_ARCHER,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.ARCANE_ARCHER,
    },
  };

  constructor(id: string, x: number, y: number) {
    super(id, x, y, TowerArcaneArcher.config);
  }

  getProjectile = () => {
    if (this.currentTarget === null) {
      throw new Error("No current target");
    }

    return new Projectile(
      shortUUID.generate(),
      this.tileMiddle.x,
      this.tileMiddle.y,
      TowerArcaneArcher.config.damage,
      {
        img: this.projectileImg,
        width: this.projectileWidth,
        height: this.projectileHeight,
      },
      this.currentTarget,
      this.removeProjectile
    );
  };

  update = () => {
    this.updateFrames();

    if (this.state === TowerState.ATTACK) {
      this.attackAnimation();

      this.shootAtAttackAnimationFrame(6, () => this.getProjectile());
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
