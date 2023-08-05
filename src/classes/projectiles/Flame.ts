import { dom } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { AnimationDirection } from "../../utils/types";

export class Flame {
  // prio todo add damage hitbox

  // initial values
  id;
  x;
  y;
  image;
  sWidth = 64;
  sHeight = 64;
  dWidth = 64;
  dHeight = 64;
  target;
  animationDirection;
  angle;
  removeProjectile;

  // frames
  frameIteration = 0;
  frames = 8;
  animationIterationCircleTime = 500;
  sX: number | null = null;
  sY: number | null = null;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  lastFrameIteration: number | null = null;
  animationStartRight = {
    sx: 0,
    sy: 0,
  };
  animationStartLeft = {
    sx: 448,
    sy: 64,
  };

  constructor(
    id: string,
    x: number,
    y: number,
    img: HTMLImageElement,
    target: { x: number; y: number },
    animationDirection: AnimationDirection,
    removeProjectile: (id: string) => void
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.image = img;
    this.target = target;
    this.animationDirection = animationDirection;
    this.angle = this.getAngleForDirection();
    this.removeProjectile = removeProjectile;

    this.setSyFrame();
  }

  private getAngleForDirection = () => {
    const angle = getAngle(this.x, this.y, this.target.x, this.target.y);
    if (this.animationDirection === AnimationDirection.RIGHT) {
      return angle;
    } else {
      // compansate for the fact that the image is flipped
      return angle + 180;
    }
  };

  private setSyFrame = () => {
    this.sY =
      this.animationDirection === AnimationDirection.RIGHT
        ? this.animationStartRight.sy
        : this.animationStartLeft.sy;
  };

  private setFrameIteration = () => {
    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.removeProjectile(this.id);
    }
  };

  private setSxFrame = () => {
    if (this.animationDirection === AnimationDirection.RIGHT) {
      this.sX = this.frameIteration * this.sWidth;
    } else {
      this.sX =
        this.frames * this.sWidth - (this.frameIteration + 1) * this.sWidth;
    }
  };

  private draw = () => {
    if (this.sX === null || this.sY === null) {
      throw new Error("sX or sY is null");
    }

    dom.ctxGame.save();
    dom.ctxGame.translate(this.x, this.y);
    dom.ctxGame.rotate(this.angle * (Math.PI / 180)); // convert degrees to radians

    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.dWidth - 32, // prio todo find correction for left and right
      -this.dHeight / 2,
      this.dWidth,
      this.dHeight
    );

    dom.ctxGame.restore();
  };

  private updateFrames = () => {
    if (this.lastFrameIteration === null) {
      // initial run
      this.setSxFrame();
      this.lastFrameIteration = performance.now();
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

  update = () => {
    this.updateFrames();
    this.draw();
  };
}
