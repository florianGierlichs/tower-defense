import { dom, game, imageController, tiles } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { getRandomFrameIteration } from "../../utils/getRandomFrameIteration";
import { reachedTarget } from "../../utils/reachedTarget";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { AnimationDirection, EnemyConfig, EnemyState } from "../../utils/types";

export class Enemy {
  // initial values
  id;
  x;
  y;
  image;
  frameConfig;
  sWidth = 64;
  sHeight = 64;
  // center image to coordinate
  imageTranslateX = this.sWidth / 2;
  imageTranslateY = this.sHeight / 2;
  dWidth;
  dHeight;
  health;
  speed;

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

  constructor(id: string, x: number, y: number, config: EnemyConfig) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.image = imageController.getImage(config.name);
    this.dWidth = config.imageScale * this.sWidth;
    this.dHeight = config.imageScale * this.sHeight;
    this.frameConfig = config.frameConfig;
    this.health = config.health;
    this.speed = config.speed;

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

  private setFrame = () => {
    if (
      this.frames === null ||
      this.flipOffsetFrames === null ||
      this.frameIteration === null
    ) {
      throw new Error("frames or flipOffsetFrames or frameIteration is null");
    }

    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.frameIteration = 0;
    }

    // set sX
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

  private move = () => {
    // move x
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);

    if (restDistanceX - this.speed < 0) {
      this.x += restDistanceX * Math.cos((this.angle * Math.PI) / 180);
    } else {
      this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    if (restDistanceY - this.speed < 0) {
      this.y += restDistanceY * Math.sin((this.angle * Math.PI) / 180);
    } else {
      this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
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
    }
  };

  private updateNodeTarget = () => {
    this.nodesIndex++;
    if (this.pathNodes.length === this.nodesIndex) {
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
      this.setFrame();
      this.lastFrameIteration = performance.now();
    } else {
      if (this.frameIterationThrottleTime === null) {
        throw new Error("frameIterationThrottleTime is null");
      }

      if (
        timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
      ) {
        this.setFrame();
        this.lastFrameIteration = performance.now();
      }
    }
  };

  reduceHealth = () => {
    // TODO include dmg value of tower
    this.health--;

    if (this.health === 0) {
      // TODO can be less than 0 if dmg is higher than remaning health
      game.enemies.remove(this.id);
      game.towers.resetTowerTarget(this.id);
    }
  };

  update = () => {
    this.move();

    this.updateFrames();

    this.draw();
  };
}
