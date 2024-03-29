import { dom, game, main } from "../../main";
import { getDistance } from "../../utils/getDistance";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { Enemy } from "../enemies/Enemy";
import { getTileMiddle } from "../../utils/getTileMiddle";
import {
  AnimationDirection,
  Buff,
  FrameConfig,
  ProjectileInstance,
  TowerConfig,
  TowerState,
} from "../../utils/types";
import { getTranslatedCanvasDestination } from "../../utils/getTranslatedCanvasDestination";
import { FreezeTower } from "../effects/FreezeTower";

interface TowerUpdateProps {
  shootAtFrame: number;
  getProjectile: () => ProjectileInstance;
  cancelProjectile?: boolean;
}
export class Tower {
  // initial values
  id;
  x;
  y;
  tileMiddle;
  damage;
  damageMultipliers: number[] = [];
  range;
  attackSpeed; // attacks per minute
  attackSpeedThrottleTime;
  image;
  sWidth;
  sHeight;
  dWidth;
  dHeight;
  imageTranslateX;
  imageTranslateY;
  imgConfig;
  frameIteration = 0;
  frameIterationThrottleTime = 100;
  cancelAttackAnimantionAllowed;

  // projectile
  projectileImg;
  projectileWidth;
  projectileHeight;

  // data
  projectiles: ProjectileInstance[] = [];
  stunns: FreezeTower[] = [];
  buffs = new Set<Buff>([]);

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
  drawImgBackground: (() => void) | null = null;

  // dynamic attack values
  lastAttack: number | null = null;
  currentTarget: Enemy | null = null;
  targetFallbackCoordinates: { x: number; y: number } | null = null;

  constructor(id: string, x: number, y: number, config: TowerConfig) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.tileMiddle = getTileMiddle({ x, y });
    this.damage = config.damage;
    this.range = config.range;
    this.attackSpeed = config.attackSpeed;
    this.attackSpeedThrottleTime = (60 / this.attackSpeed) * 1000;
    this.cancelAttackAnimantionAllowed = config.cancelAttackAnimantionAllowed;

    this.image = main.imageController.getImage(config.id);
    this.sWidth = config.sWidth;
    this.sHeight = config.sHeight;
    this.dWidth = config.imageScale * config.sWidth;
    this.dHeight = config.imageScale * config.sHeight;
    this.imageTranslateX = getTranslatedCanvasDestination({
      imageScale: config.imageScale,
      sourceSize: config.sWidth,
      translateCorrection: config.imageTranslateCorrection.x,
    });
    this.imageTranslateY = getTranslatedCanvasDestination({
      imageScale: config.imageScale,
      sourceSize: config.sHeight,
      translateCorrection: config.imageTranslateCorrection.y,
    });
    this.imgConfig = config.frameConfig;

    this.setImageConfig();

    this.projectileImg = main.imageController.getImage(config.projectile.id);
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
        this.targetFallbackCoordinates = null;
      }
    }
  };

  private drawImg = () => {
    if (this.drawImgBackground) {
      this.drawImgBackground();
    }
    if (this.sX !== null && this.sY !== null) {
      dom.ctxGame.drawImage(
        this.image,
        this.sX,
        this.sY,
        this.sWidth,
        this.sHeight,
        this.x + this.imageTranslateX,
        this.y + this.imageTranslateY,
        this.dWidth,
        this.dHeight
      );
    }
  };

  idleAnimation = () => {
    this.drawImg();
  };

  private setStateAndCurrentTarget = (target: Enemy | null) => {
    this.currentTarget = target;

    if (
      target === null &&
      this.state === TowerState.ATTACK &&
      !this.cancelAttackAnimantionAllowed
    ) {
      // some tower should not cancel the attack animation if the target died in the meantime
      return;
    }

    this.newAnimationCycle = true;
    this.frameIteration = 0;

    if (target === null) {
      this.state = TowerState.IDLE;
      this.setImageConfig();
    } else {
      this.targetFallbackCoordinates = {
        x: target.x,
        y: target.y,
      };

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

  shootAtAttackAnimationFrame = (
    frameToShotAt: number,
    getProjectile: () => ProjectileInstance
  ) => {
    if (timeHasPassed(this.lastAttack, this.attackSpeedThrottleTime)) {
      if (this.frameIteration === frameToShotAt) {
        this.shoot();
        this.projectiles.push(getProjectile());
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

  addStun = (stun: FreezeTower) => {
    this.stunns.push(stun);
    this.state = TowerState.STUNNED;
  };

  resetAfterStun = () => {
    this.setStateAndCurrentTarget(null);
  };

  updateStunns = () => {
    this.stunns.forEach((stunn) => stunn.update());

    const now = performance.now();
    this.stunns.forEach((stunn) => {
      if (now - stunn.freezeStart >= stunn.duration) {
        this.stunns = this.stunns.filter((s) => s.id !== stunn.id);
      }
    });
  };

  addBuffId = (buff: Buff) => {
    this.buffs.add(buff);
  };

  removeBuffId = (buff: Buff) => {
    this.buffs.delete(buff);
  };

  addDamageBuffMultiplier = (value: number) => {
    this.damageMultipliers.push(value);
  };

  removeDamageBuffMultiplier = (value: number) => {
    const index = this.damageMultipliers.indexOf(value);
    if (index > -1) {
      this.damageMultipliers.splice(index, 1);
    } else {
      throw new Error("Buff multiplier not found");
    }
  };

  getCurrentDamage = () => {
    let currentDamage;
    if (this.damageMultipliers.length === 0) {
      currentDamage = this.damage;
    } else {
      currentDamage =
        this.damage * this.damageMultipliers.reduce((a, b) => a + b, 0);
      // I think this only works if the damageMultipliers are all positive
      // a debuff like damage x 0.5 would not work
    }
    return currentDamage;
  };

  update({ shootAtFrame, getProjectile, cancelProjectile }: TowerUpdateProps) {
    if (this.state === TowerState.STUNNED) {
      this.drawImg();
      if (cancelProjectile) {
        this.projectiles = [];
      } else {
        this.updateProjectiles();
      }
    } else {
      this.updateFrames();

      if (this.state === TowerState.ATTACK) {
        this.attackAnimation();
        this.shootAtAttackAnimationFrame(shootAtFrame, getProjectile);
        this.updateProjectiles();
      }

      if (this.state === TowerState.IDLE) {
        this.idleAnimation();
        if (timeHasPassed(this.lastAttack, this.attackSpeedThrottleTime)) {
          this.checkAndSetClosestEnemyInRange();
        }
        this.updateProjectiles();
      }
    }

    if (this.showRange) {
      this.drawRange();
    }

    this.updateStunns();
  }
}
