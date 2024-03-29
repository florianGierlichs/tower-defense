import { dom, game, main, tiles } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { getRandomFrameIteration } from "../../utils/getRandomFrameIteration";
import { moveX, moveY } from "../../utils/move";
import { reachedTarget } from "../../utils/reachedTarget";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { AnimationDirection, EnemyConfig, EnemyState } from "../../utils/types";
import { Slow } from "../effects/Slow";

export class Enemy {
  // initial values
  id;
  x;
  y;
  image;
  frameConfig;
  sWidth;
  sHeight;
  // center image to coordinate
  imageTranslateX;
  imageTranslateY;
  dWidth;
  dHeight;
  health;
  currentHealth;
  speed;
  maxSlowPercentage;
  bountyGold;

  // states
  state = EnemyState.MOVE;
  animationDirection = AnimationDirection.RIGHT;

  // dynamic animation values
  frameIteration: number | null = null;
  frames: number | null = null;
  flipOffsetFrames: number | null = null;
  sX: number | null = null;
  sY: number | null = null;
  frameIterationThrottleTime: number | null = null;
  lastFrameIteration: number | null = null;

  // dynamic movement values
  nodeTarget;
  pathNodes;
  angle;
  nodesIndex = 0;

  // data
  slows: Slow[] = [];

  constructor(id: string, x: number, y: number, config: EnemyConfig) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.image = main.imageController.getEnemyImage(config.id);
    this.sWidth = config.sWidth;
    this.sHeight = config.sHeight;
    this.dWidth = config.imageScale * config.sWidth;
    this.dHeight = config.imageScale * config.sHeight;
    this.imageTranslateX =
      config.sWidth / 2 - config.imageTranslateCorrection.x;
    this.imageTranslateY =
      config.sHeight / 2 - config.imageTranslateCorrection.y;
    this.frameConfig = config.frameConfig;
    this.health = config.health;
    this.currentHealth = this.health;
    this.speed = config.speed;
    this.maxSlowPercentage = config.maxSlowPercentage;
    this.bountyGold = config.bountyGold;

    this.setImageConfig();

    this.pathNodes = tiles.getPathNodes();
    this.nodeTarget = this.pathNodes[this.nodesIndex];
    this.angle = getAngle(this.x, this.y, this.nodeTarget.x, this.nodeTarget.y);
  }

  private getImgConfigForState = () => {
    switch (this.state) {
      case EnemyState.MOVE:
        return this.frameConfig.move;
      default:
        return this.frameConfig.move;
    }
  };

  setImageConfig = () => {
    const {
      animationStartRight,
      animationStartLeft,
      frames,
      animationIterationCircleTime,
      flipOffsetFrames,
    } = this.getImgConfigForState();

    // sX is set in setFrame
    this.sY =
      this.animationDirection === AnimationDirection.RIGHT
        ? animationStartRight.sy
        : animationStartLeft.sy;
    this.frames = frames;
    this.flipOffsetFrames = flipOffsetFrames;
    this.frameIterationThrottleTime =
      animationIterationCircleTime / this.frames;

    this.frameIteration = getRandomFrameIteration(this.frames);
  };

  private setFrameIteration = () => {
    if (this.frames === null || this.frameIteration === null) {
      throw new Error("frames or frameIteration is null");
    }
    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.frameIteration = 0;
    }
  };

  private setSxFrame = () => {
    if (
      this.frames === null ||
      this.flipOffsetFrames === null ||
      this.frameIteration === null
    ) {
      throw new Error("frames or flipOffsetFrames or frameIteration is null");
    }
    if (this.animationDirection === AnimationDirection.RIGHT) {
      this.sX = this.frameIteration * this.sWidth;
    } else {
      this.sX =
        (this.frames + this.flipOffsetFrames) * this.sWidth -
        (this.frameIteration + 1) * this.sWidth;
    }
  };

  draw = () => {
    if (this.sX === null || this.sY === null) {
      throw new Error("sX or sY is null");
    }
    if (this.frameIteration === this.frames) {
      throw new Error("frameIteration is equal to frames");
    }
    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.x - this.imageTranslateX,
      this.y - this.imageTranslateY,
      this.dWidth,
      this.dHeight
    );

    const healthBarMultiplier = 0.6;
    const healthBarHeight = 3;
    const healthBarOffsetY = 5;
    const healthBarOffsetX =
      (this.dWidth - this.dWidth * healthBarMultiplier) / 2;

    // red
    dom.ctxGame.fillStyle = "#7d0e0e";
    dom.ctxGame.fillRect(
      this.x - this.imageTranslateX + healthBarOffsetX,
      this.y - this.imageTranslateY - healthBarOffsetY,
      this.dWidth * healthBarMultiplier,
      healthBarHeight
    );

    // green
    dom.ctxGame.fillStyle = "#0a5a0a";
    dom.ctxGame.fillRect(
      this.x - this.imageTranslateX + healthBarOffsetX,
      this.y - this.imageTranslateY - healthBarOffsetY,
      this.dWidth * (this.currentHealth / this.health) * healthBarMultiplier,
      healthBarHeight
    );
  };

  addSlow = (slow: Slow) => {
    this.slows.push(slow);
  };

  updateSlows = () => {
    const now = performance.now();
    this.slows.forEach((slow) => {
      if (now - slow.slowStart >= slow.slowDuration) {
        this.slows = this.slows.filter((s) => s.id !== slow.id);
      }
    });
  };

  private getCurrentSpeed = () => {
    if (this.slows.length === 0) {
      return this.speed;
    }

    const combinedSlowPercentage = this.slows.reduce(
      (acc, slow) => acc + slow.slowPercentage,
      0
    );

    const finalSlowPercentage =
      combinedSlowPercentage > this.maxSlowPercentage
        ? this.maxSlowPercentage
        : combinedSlowPercentage;

    return this.speed * ((100 - finalSlowPercentage) / 100);
  };

  move = () => {
    const currentSpeed = this.getCurrentSpeed();

    // move x
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);

    this.x += moveX({
      distance: restDistanceX - currentSpeed < 0 ? restDistanceX : currentSpeed,
      angle: this.angle,
    });

    // move y
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    this.y += moveY({
      distance: restDistanceY - currentSpeed < 0 ? restDistanceY : currentSpeed,
      angle: this.angle,
    });

    //reach path node
    if (
      reachedTarget(
        { x: this.x, y: this.y },
        { x: this.nodeTarget.x, y: this.nodeTarget.y }
      )
    ) {
      this.updateNodeTarget();
      this.updateAnimationDirection();
      this.setImageConfig();
      this.reduceBountyGold();
    }
  };

  updateNodeTarget = () => {
    this.nodesIndex++;
    if (this.pathNodes.length === this.nodesIndex) {
      game.playerHealth.reduceHealth();
      game.enemies.remove(this.id);
      game.towers.resetTowerTarget(this.id);
      return;
    }
    this.nodeTarget = this.pathNodes[this.nodesIndex];
    this.angle = getAngle(this.x, this.y, this.nodeTarget.x, this.nodeTarget.y);
  };

  updateAnimationDirection = () => {
    // move up or down
    if (
      (this.x - this.nodeTarget.x - 1) * (this.x - this.nodeTarget.x + 1) <=
      0 // checks if x is between nodeTarget.x - 1 and nodeTarget.x + 1 because of float
    ) {
      this.animationDirection =
        Math.random() < 0.5
          ? AnimationDirection.RIGHT
          : AnimationDirection.LEFT;
      return;
    }

    // move right
    if (this.x < this.nodeTarget.x) {
      this.animationDirection = AnimationDirection.RIGHT;
    }

    // move left
    if (this.x > this.nodeTarget.x) {
      this.animationDirection = AnimationDirection.LEFT;
    }
  };

  updateFrames = () => {
    if (this.lastFrameIteration === null) {
      // initial run
      this.setSxFrame();
      this.lastFrameIteration = performance.now();
    } else {
      if (this.frameIterationThrottleTime === null) {
        throw new Error("frameIterationThrottleTime is null");
      }

      if (
        timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
      ) {
        this.setFrameIteration();
        this.setSxFrame();
        this.lastFrameIteration = performance.now();
      }
    }
  };

  private reduceBountyGold = () => {
    // reduce bounty gold by 10%
    this.bountyGold = Math.round(this.bountyGold * 0.9);
  };

  reduceHealth = (amount: number, _towerSourceId: string) => {
    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      if (game.enemies.getEnemyById(this.id) !== undefined) {
        game.gold.increaseGoldAfterKillEnemy(this.bountyGold);
        game.enemies.remove(this.id);
        game.towers.resetTowerTarget(this.id);
      }
    }
  };

  setNodeIndex = (index: number) => {
    this.nodesIndex = index;
  };

  update = () => {
    this.updateFrames();
    this.updateSlows();
    this.move();
    this.draw();
  };
}
