import shortUUID from "short-uuid";
import { dom, game, imageController } from "../../main";
import { getDistance } from "../../utils/getDistance";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { Enemy } from "../enemies/Enemy";
import { Projectile } from "../projectiles/Projectile";
import { getTileMiddle } from "../../utils/getTileMiddle";
import {
  AnimationDirection,
  FrameConfig,
  FrameConfigs,
  TowerConfig,
  TowerState,
} from "../../utils/types";

export class Tower {
  id;
  x;
  y;
  tileMiddle;
  range: number;
  attackSpeed: number;
  lastAttack: number | null = null;
  projectiles: Projectile[] = [];
  currentTarget: Enemy | null = null;
  attackAnimationIsRunning: boolean = false;
  showRange: boolean = false;

  image: HTMLImageElement;
  sWidth: number = 64;
  sHeight: number = this.sWidth;
  sX: number | null = null;
  sY: number | null = null;
  dWidth: number = 64;
  dHeight: number = this.dWidth;
  dX: number;
  dY: number;
  frames: number | null = null;
  flipOffsetFrames: number | null = null;

  frameIteration: number = 0;
  lastFrameIteration: number | null = null;
  frameIterationThrottleTime: number = 100;
  state: TowerState = TowerState.IDLE;
  imgConfig: FrameConfigs;
  updateImgConfig = false;
  animationDirection: AnimationDirection = AnimationDirection.LEFT;

  projectileImg;
  projectileWidth;
  projectileHeight;

  constructor(id: string, x: number, y: number, config: TowerConfig) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.tileMiddle = getTileMiddle({ x, y });
    this.range = config.range;
    this.attackSpeed = config.attackSpeed;

    this.image = imageController.getImage(config.id);
    this.imgConfig = config.frameConfig;
    this.dX = x;
    this.dY = y;

    this.setImageConfig();

    this.projectileImg = imageController.getImage(config.projectile.id);
    this.projectileWidth = config.projectile.width;
    this.projectileHeight = config.projectile.height;
  }

  private getImgConfigForState = () => {
    let imageConfig: FrameConfig;
    switch (this.state) {
      case TowerState.IDLE:
        imageConfig = this.imgConfig.idle;
        break;
      default:
        imageConfig = this.imgConfig.attack;
    }
    return imageConfig;
  };

  private setImageConfig = () => {
    const {
      animationStartRight,
      animationStartLeft,
      frames,
      animationIterationCircleTime,
      flipOffsetFrames,
    } = this.getImgConfigForState();
    this.sX =
      this.animationDirection === AnimationDirection.RIGHT
        ? animationStartRight.sx
        : animationStartLeft.sx;
    this.sY =
      this.animationDirection === AnimationDirection.RIGHT
        ? animationStartRight.sy
        : animationStartLeft.sy;
    this.frames = frames;
    this.flipOffsetFrames = flipOffsetFrames;
    this.frameIterationThrottleTime =
      animationIterationCircleTime / this.frames;
  };

  private setFrame = () => {
    if (this.frames !== null && this.flipOffsetFrames !== null) {
      if (this.animationDirection === AnimationDirection.RIGHT) {
        this.sX = this.frameIteration * this.sWidth;
      } else {
        this.sX =
          (this.frames + this.flipOffsetFrames) * this.sWidth -
          (this.frameIteration + 1) * this.sWidth;
      }

      // prepare frame for next iteration
      if (this.frameIteration < this.frames - 1) {
        this.frameIteration++;
      } else {
        this.frameIteration = 0;

        // after full attack animation circle
        if (this.attackAnimationIsRunning) {
          this.createProjectile();
          this.attackAnimationIsRunning = false;
          this.state = TowerState.IDLE;
          this.setImageConfig();
        }
      }
    }
  };

  private drawImg = () => {
    if (this.sX !== null && this.sY !== null) {
      dom.ctxGame.drawImage(
        this.image,
        this.sX,
        this.sY,
        this.sWidth,
        this.sHeight,
        this.dX,
        this.dY,
        this.dWidth, // TODO Add scale factor for individual towers
        this.dHeight
      );
    }
  };

  private idle = () => {
    if (
      timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
    ) {
      this.setFrame();
      this.lastFrameIteration = performance.now();
    }
    this.drawImg();
  };

  private setStateAndCurrentTarget = (target: Enemy | null) => {
    if (target === null) {
      this.state = TowerState.IDLE;
      this.setImageConfig();
    } else {
      this.state = TowerState.ATTACK;
    }
    this.currentTarget = target;
    this.frameIteration = 0;
  };

  private checkAndSetClosestEnemyInRange = () => {
    if (
      this.currentTarget !== null &&
      getDistance(this.tileMiddle, {
        x: this.currentTarget.x,
        y: this.currentTarget.y,
      }) <= this.range
    ) {
      this.setStateAndCurrentTarget(this.currentTarget);
    } else {
      let distanceOfClosestEnemy = Infinity;

      game.enemies.getCurrentEnemies().forEach((enemy) => {
        const enemyDistance = getDistance(this.tileMiddle, {
          x: enemy.x,
          y: enemy.y,
        });

        if (
          enemyDistance <= this.range &&
          enemyDistance <= distanceOfClosestEnemy
        ) {
          distanceOfClosestEnemy = enemyDistance;
          this.setStateAndCurrentTarget(enemy);
        }
      });
    }
  };

  private currentTargetIsInRage = () => {
    if (this.currentTarget) {
      const currentTargetDistance = getDistance(this.tileMiddle, {
        x: this.currentTarget.x,
        y: this.currentTarget.y,
      });

      if (currentTargetDistance > this.range) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  private attack = () => {
    this.lastAttack = performance.now();
    this.attackAnimationIsRunning = true;
    this.setAnimationDirection();
    this.setImageConfig();
  };

  private setAnimationDirection = () => {
    if (this.currentTarget) {
      if (this.currentTarget.x <= this.x) {
        if (this.animationDirection === AnimationDirection.RIGHT) {
          this.animationDirection = AnimationDirection.LEFT;
          this.updateImgConfig = true;
        }
      } else {
        if (this.animationDirection === AnimationDirection.LEFT) {
          this.animationDirection = AnimationDirection.RIGHT;
          this.updateImgConfig = true;
        }
      }
    }
  };

  private shoot = () => {
    if (
      timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
    ) {
      this.setFrame();
      this.lastFrameIteration = performance.now();
    }
    this.drawImg();
  };

  private createProjectile = () => {
    if (this.currentTarget) {
      this.projectiles.push(
        new Projectile(
          shortUUID.generate(),
          this.tileMiddle.x,
          this.tileMiddle.y,
          {
            img: this.projectileImg,
            width: this.projectileWidth,
            height: this.projectileHeight,
          },
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
    this.setStateAndCurrentTarget(null);
  };

  private drawRange = () => {
    dom.ctxGame.beginPath();
    dom.ctxGame.arc(
      this.tileMiddle.x,
      this.tileMiddle.y,
      this.range,
      0,
      Math.PI * 2
    );
    dom.ctxGame.fillStyle = "rgba(225,225,225,0.1)";
    dom.ctxGame.fill();
  };

  setShowRange = (show: boolean) => {
    this.showRange = show;
  };

  update = () => {
    if (this.attackAnimationIsRunning) {
      this.shoot();
    } else {
      if (this.state === TowerState.IDLE) {
        this.idle();
        if (timeHasPassed(this.lastAttack, this.attackSpeed)) {
          this.checkAndSetClosestEnemyInRange();
        }
      } else {
        if (this.currentTargetIsInRage()) {
          this.attack();
          this.shoot();
        } else {
          this.setStateAndCurrentTarget(null);
          this.idle();
        }
      }
    }

    if (this.showRange) {
      this.drawRange();
    }

    this.updateProjectiles();
  };
}
