import { dom, game, main, tiles } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { getRandomFrameIteration } from "../../utils/getRandomFrameIteration";
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
    this.image = main.imageController.getImage(config.id);
    this.sWidth = config.sWidth;
    this.sHeight = config.sHeight;
    this.dWidth = config.imageScale * config.sWidth;
    this.dHeight = config.imageScale * config.sHeight;
    this.imageTranslateX = config.sWidth / 2;
    this.imageTranslateY = config.sHeight / 2;
    this.frameConfig = config.frameConfig;
    this.health = config.health;
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

  private setImageConfig = () => {
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

  private draw = () => {
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
      this.y - this.imageTranslateY, // todo need individual frame correction so that the image is centered on the path
      this.dWidth,
      this.dHeight
    );
  };

  addSlow = (slow: Slow) => {
    this.slows.push(slow);
  };

  private updateSlows = () => {
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

  private move = () => {
    const currentSpeed = this.getCurrentSpeed();

    // move x
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);

    if (restDistanceX - currentSpeed < 0) {
      this.x += restDistanceX * Math.cos((this.angle * Math.PI) / 180);
    } else {
      this.x += currentSpeed * Math.cos((this.angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    if (restDistanceY - currentSpeed < 0) {
      this.y += restDistanceY * Math.sin((this.angle * Math.PI) / 180);
    } else {
      this.y += currentSpeed * Math.sin((this.angle * Math.PI) / 180);
    }

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

  private updateNodeTarget = () => {
    this.nodesIndex++;
    if (this.pathNodes.length === this.nodesIndex) {
      game.playerHealth.reduceHealth();
      game.enemies.remove(this.id);
      return;
    }
    this.nodeTarget = this.pathNodes[this.nodesIndex];
    this.angle = getAngle(this.x, this.y, this.nodeTarget.x, this.nodeTarget.y);
  };

  private updateAnimationDirection = () => {
    // move up or down
    if (this.x === this.nodeTarget.x) {
      this.animationDirection =
        Math.random() < 0.5
          ? AnimationDirection.RIGHT
          : AnimationDirection.LEFT;
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

  private updateFrames = () => {
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

  reduceHealth = (amount: number) => {
    this.health -= amount;
    if (this.health <= 0) {
      game.enemies.remove(this.id);
      game.gold.increaseGoldAfterKillEnemy(this.bountyGold);
      game.towers.resetTowerTarget(this.id);
    }
  };

  update = () => {
    this.updateFrames();
    this.updateSlows();
    this.move();
    this.draw();
  };
}
