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
  sWidth = 74;
  sHeight = 44;
  dWidth = 74;
  dHeight = 44;
  sY = 0;
  target;
  animationDirection;
  angle;
  removeProjectile;

  // frames
  frameIteration = 0;
  frames = 8;
  animationIterationCircleTime = 800;
  sX: number | null = null;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  lastFrameIteration: number | null = null;

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
    this.angle = getAngle(this.x, this.y, this.target.x, this.target.y);
    this.removeProjectile = removeProjectile;
  }

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

  private getHandPosition = (): [number, number] => {
    if (this.animationDirection === AnimationDirection.RIGHT) {
      return [this.x + 15, this.y - 5];
    } else {
      return [this.x - 15, this.y - 5];
    }
  };

  private draw = () => {
    if (this.sX === null || this.sY === null) {
      throw new Error("sX or sY is null");
    }

    dom.ctxGame.save();

    dom.ctxGame.translate(...this.getHandPosition());
    dom.ctxGame.rotate(this.angle * (Math.PI / 180)); // convert degrees to radians

    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      0,
      -25, // position in the image where the flame starts
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
