import { dom, main } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { getTileMiddle } from "../../utils/getTileMiddle";
import { reachedTarget } from "../../utils/reachedTarget";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { EnemyProjectileId, TowerInstance } from "../../utils/types";

interface IcicleProps {
  id: string;
  x: number;
  y: number;
  target: TowerInstance;
  speed: number;
  removeProjectile: (id: string) => void;
}

export class Icicle {
  id;
  x;
  y;
  target;
  targetMiddleX;
  targetMiddleY;
  speed;
  removeProjectile;
  angle;

  image: HTMLImageElement;
  sWidth: number;
  sHeight: number;

  // frames
  frameIteration = 0;
  frames = 10;
  animationIterationCircleTime = 800;
  sX: number | null = null;
  sY = 0;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  lastFrameIteration: number | null = null;

  constructor({ id, x, y, target, speed, removeProjectile }: IcicleProps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.target = target;
    this.speed = speed;
    this.removeProjectile = removeProjectile;

    const { x: targetMiddleX, y: targetMiddleY } = getTileMiddle({
      x: this.target.x,
      y: this.target.y,
    });

    this.targetMiddleX = targetMiddleX;
    this.targetMiddleY = targetMiddleY;
    this.angle = getAngle(
      this.x,
      this.y,
      this.targetMiddleX,
      this.targetMiddleY
    );

    this.image = main.imageController.getImage(EnemyProjectileId.ICICLE);
    this.sWidth = 48;
    this.sHeight = 32;
  }

  private setFrameIteration = () => {
    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.frameIteration = 0;
    }
  };

  private setSxFrame = () => {
    this.sX = this.frameIteration * this.sWidth;
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

  private draw = () => {
    if (this.sX === null) {
      throw new Error("sX is null");
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
      0 - 20, // magic numbers to find the peak of the icicle hitting the tower
      0 - this.sHeight / 2,
      this.sWidth,
      this.sHeight
    );
    dom.ctxGame.restore();
  };

  private move = () => {
    // move x
    const restDistanceX = Math.abs(this.targetMiddleX - this.x);

    if (restDistanceX - this.speed < 0) {
      this.x += restDistanceX * Math.cos((this.angle * Math.PI) / 180);
    } else {
      this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.targetMiddleY - this.y);

    if (restDistanceY - this.speed < 0) {
      this.y += restDistanceY * Math.sin((this.angle * Math.PI) / 180);
    } else {
      this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
    }

    // check for collision
    if (
      reachedTarget(
        { x: this.x, y: this.y },
        { x: this.targetMiddleX, y: this.targetMiddleY }
      )
    ) {
      this.collide();
    }
  };

  private collide = () => {
    this.removeProjectile(this.id);
    console.log("collide icicle");
  };

  update = () => {
    this.move();
    this.updateFrames();
    this.draw();
  };
}
