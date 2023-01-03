import shortUUID from "short-uuid";
import { ctxGame, game } from "../main";
import { getDistance } from "../utils/getDistance";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

export type towerState = "idle" | "attack";

export interface ImgConfig {
  frames: number;
  sx: number;
  sy: number;
}

export type ImgConfigs = Record<towerState, ImgConfig>;
export class Tower {
  id;
  x;
  y;
  range: number = 150;
  attackSpeed: number = 1000; // Miliseconds
  lastAttack: number | null = null;
  projectiles: Projectile[] = [];
  currentTarget: Enemy | null = null;

  image: HTMLImageElement;
  sWidth: number = 64;
  sHeight: number = this.sWidth;
  sX: number;
  sY: number;
  dWidth: number = 64;
  dHeight: number = this.dWidth;
  dX: number;
  dY: number;
  frames: number;

  frameIteration: number = 0;
  lastFrameIteration: number | null = null;
  frameIterationThrottleTime: number = 100;
  state: towerState = "idle";

  constructor(
    id: string,
    x: number,
    y: number,
    img: HTMLImageElement,
    config: ImgConfigs
  ) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.image = img;
    this.dX = x;
    this.dY = y;

    const { sx, sy, frames } = this.getImgConfig(config);
    this.sX = sx;
    this.sY = sy;
    this.frames = frames;
  }

  getImgConfig = (config: ImgConfigs) => {
    let imageConfig: ImgConfig;
    switch (this.state) {
      case "idle":
        imageConfig = config.idle;
        break;
      default:
        imageConfig = config.attack;
    }
    return imageConfig;
  };

  setFrame = () => {
    if (
      timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
    ) {
      this.sX = this.frameIteration * this.sWidth;

      if (this.frameIteration < this.frames - 1) {
        this.frameIteration++;
      } else {
        this.frameIteration = 0;
      }

      this.lastFrameIteration = performance.now();
    }
  };

  drawImg = () => {
    ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.dX,
      this.dY,
      this.dWidth,
      this.dHeight
    );
  };

  private setCurrentTarget = (target: Enemy | null) => {
    if (target === null) {
      this.state = "idle";
    } else {
      this.state = "attack";
    }
    this.currentTarget = target;
  };

  private setClosestEnemyInRange = () => {
    let distanceOfClosestEnemy = Infinity;

    game.enemies.getEnemies().forEach((enemy) => {
      const enemyDistance = getDistance(
        { x: this.x, y: this.y },
        { x: enemy.x, y: enemy.y }
      );

      if (
        enemyDistance <= this.range &&
        enemyDistance <= distanceOfClosestEnemy
      ) {
        distanceOfClosestEnemy = enemyDistance;
        this.setCurrentTarget(enemy);
      }
    });
  };

  private checkCurrentTargetIsInRage = () => {
    if (this.currentTarget) {
      const currentTargetDistance = getDistance(
        { x: this.x, y: this.y },
        { x: this.currentTarget.x, y: this.currentTarget.y }
      );

      if (currentTargetDistance > this.range) {
        this.setCurrentTarget(null);
      } else {
        if (timeHasPassed(this.lastAttack, this.attackSpeed)) {
          this.createProjectile();
          this.lastAttack = performance.now();
        }
      }
    }
  };

  private createProjectile = () => {
    if (this.currentTarget) {
      this.projectiles.push(
        new Projectile(
          shortUUID.generate(),
          this.x,
          this.y,
          this.currentTarget,
          this.removeProjectile
        )
      );
    }
  };

  private updateProjectiles = () => {
    this.projectiles.forEach((projectile) => projectile.update());
  };

  private removeProjectile = (id: string) => {
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.id !== id
    );
  };

  removeTarget = () => {
    this.setCurrentTarget(null);
  };

  update = () => {
    this.setFrame();
    this.drawImg();
    this.updateProjectiles();

    if (this.currentTarget) {
      this.checkCurrentTargetIsInRage();
    } else {
      this.setClosestEnemyInRange();
    }
  };
}
