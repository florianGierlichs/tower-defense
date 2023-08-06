import { dom, game, imageController } from "../../main";
import { getDistance } from "../../utils/getDistance";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { Enemy } from "../enemies/Enemy";
import { getTileMiddle } from "../../utils/getTileMiddle";
import {
  AnimationDirection,
  FrameConfig,
  ProjectileInstance,
  TowerConfig,
  TowerState,
} from "../../utils/types";

export class Tower {
  // initial values
  id;
  x;
  y;
  tileMiddle;
  range;
  attackSpeed; // todo is more throttletime than attackSpeed
  image;
  sWidth = 64;
  sHeight = this.sWidth;
  dWidth = 64;
  dHeight = this.dWidth;
  dX;
  dY;
  imgConfig;
  frameIteration = 0;
  frameIterationThrottleTime = 100;

  // projectile
  projectileImg;
  projectileWidth;
  projectileHeight;

  // data
  projectiles: ProjectileInstance[] = [];

  // states
  state = TowerState.IDLE;
  animationDirection = AnimationDirection.LEFT;
  showRange = false;
  updateImgConfig = false;
  newAnimationCycle = true;

  // dynamic animation values
  sX: number | null = null;
  sY: number | null = null;
  frames: number | null = null;
  flipOffsetFrames: number | null = null;
  lastFrameIteration: number | null = null;

  // dynamic attack values
  lastAttack: number | null = null;
  currentTarget: Enemy | null = null;

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

  private setSxFrame = () => {
    if (this.frames === null || this.flipOffsetFrames === null) {
      throw new Error("Frames or flipOffsetFrames is null");
    }
    if (this.animationDirection === AnimationDirection.RIGHT) {
      this.sX = this.frameIteration * this.sWidth;
    } else {
      this.sX =
        (this.frames + this.flipOffsetFrames) * this.sWidth -
        (this.frameIteration + 1) * this.sWidth;
    }
  };

  private shoot = () => {
    this.lastAttack = performance.now();
  };

  private setFrameIteration = () => {
    if (this.frames === null) {
      throw new Error("Frames is null");
    }

    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.frameIteration = 0;
      this.newAnimationCycle = true;

      if (this.state === TowerState.ATTACK) {
        this.state = TowerState.IDLE;
        this.setImageConfig();
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

  idleAnimation = () => {
    this.drawImg();
  };

  private setStateAndCurrentTarget = (target: Enemy | null) => {
    this.currentTarget = target;
    this.newAnimationCycle = true;
    this.frameIteration = 0;

    if (target === null) {
      this.state = TowerState.IDLE;
      this.setImageConfig();
    } else {
      this.state = TowerState.ATTACK;
      this.setAnimationDirection();
      this.setImageConfig();
    }
  };

  private findNextTarget = (): Enemy | null => {
    let nextEnemy: Enemy | null = null;
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
        nextEnemy = enemy;
      }
    });
    return nextEnemy;
  };

  checkAndSetClosestEnemyInRange = () => {
    if (this.currentTargetIsInRage()) {
      this.setStateAndCurrentTarget(this.currentTarget);
    } else {
      const nextEnemy = this.findNextTarget();
      if (nextEnemy !== null) {
        this.setStateAndCurrentTarget(nextEnemy);
      }
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

  private setAnimationDirection = () => {
    if (this.currentTarget === null) {
      throw new Error("No current target");
    }

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
  };

  attackAnimation = () => {
    this.drawImg();
  };

  updateProjectiles = () => {
    this.projectiles.forEach((projectile) => projectile.update());
  };

  removeProjectile = (id: string) => {
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.id !== id
    );
  };

  removeTarget = () => {
    this.setStateAndCurrentTarget(null);
  };

  drawRange = () => {
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

  private isLastAttackAnimationFrame = () => {
    if (this.frames === null) {
      throw new Error("Frames is null");
    }
    return this.frameIteration === this.frames - 1;
  };

  private isFirstAttackAnimationFrame = () => {
    if (this.frames === null) {
      throw new Error("Frames is null");
    }
    return this.frameIteration === 0;
  };

  shootAtStartAttackAnimation = (projectile: ProjectileInstance) => {
    if (timeHasPassed(this.lastAttack, this.attackSpeed)) {
      if (this.isFirstAttackAnimationFrame()) {
        this.shoot();
        this.projectiles.push(projectile);
      }
    }
  };

  shootAtEndAttackAnimation = (projectile: ProjectileInstance) => {
    if (timeHasPassed(this.lastAttack, this.attackSpeed)) {
      if (this.isLastAttackAnimationFrame()) {
        this.shoot();
        this.projectiles.push(projectile);
      }
    }
  };

  updateFrames = () => {
    if (this.newAnimationCycle === true) {
      this.setSxFrame();
      this.lastFrameIteration = performance.now();
      this.newAnimationCycle = false;
    } else {
      if (
        timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
      ) {
        this.setFrameIteration();
        this.setSxFrame();
        this.lastFrameIteration = performance.now();
      }
    }
  };
}
