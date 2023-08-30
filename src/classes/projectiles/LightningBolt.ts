import shortUUID from "short-uuid";
import { dom } from "../../main";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { AoeSlow } from "../effects/AoeSlow";

export class LightningBolt {
  // initial values
  id;
  x;
  y;
  damage;
  image;
  sWidth = 150;
  sHeight = 192;
  dWidth = 150;
  dHeight = 192;
  sY = 0;
  dX;
  dY;
  removeProjectile;
  radius = 70;

  // frames
  frameIteration = 0;
  frames = 7;
  animationIterationCircleTime = 600;
  sX: number | null = null;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  lastFrameIteration: number | null = null;

  constructor(
    id: string,
    x: number,
    y: number,
    damage: number,
    img: HTMLImageElement,
    target: { x: number; y: number },
    removeProjectile: (id: string) => void
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.image = img;
    this.dX = target.x;
    this.dY = target.y;
    this.removeProjectile = removeProjectile;

    new AoeSlow(
      shortUUID.generate(),
      this.dX,
      this.dY,
      this.radius,
      this.damage
    );
  }

  private setFrameIteration = () => {
    this.frameIteration++;
  };

  private setSxFrame = () => {
    this.sX = this.frameIteration * this.sWidth;
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
      this.dX - this.dWidth / 2,
      this.dY - this.dHeight / 1.35, // magic numbers to center middle of explosion to target
      this.dWidth,
      this.dHeight
    );
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
        if (this.frameIteration === this.frames) {
          this.removeProjectile(this.id);
          return false;
        }
        this.setSxFrame();
        this.lastFrameIteration = performance.now();
      }
    }
    return true;
  };

  update = () => {
    if (this.updateFrames() === false) return;

    this.draw();
  };
}
