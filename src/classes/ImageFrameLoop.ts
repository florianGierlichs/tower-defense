import { dom } from "../main";
import { timeHasPassed } from "../utils/timeHasPassed";
import { TowerInstance } from "../utils/types";

interface ImageFrameLoopProps {
  image: HTMLImageElement;
  frames: number;
  animationIterationCircleTime: number;
  sWidth: number;
  sHeight: number;
  imageScale: number;
  imageTranslateCorrection: { x: number; y: number };
  target: TowerInstance;
}

export class ImageFrameLoop {
  image;
  frames;
  animationIterationCircleTime;
  sWidth;
  sHeight;
  imageScale;
  imageTranslateCorrection;
  target;

  frameIteration = 0;
  sX: number | null = null;
  frameIterationThrottleTime;
  lastFrameIteration: number | null = null;

  constructor({
    image,
    frames,
    animationIterationCircleTime,
    sWidth,
    sHeight,
    imageScale,
    imageTranslateCorrection,
    target,
  }: ImageFrameLoopProps) {
    this.image = image;
    this.frames = frames;
    this.animationIterationCircleTime = animationIterationCircleTime;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.imageScale = imageScale;
    this.imageTranslateCorrection = imageTranslateCorrection;
    this.frameIterationThrottleTime =
      this.animationIterationCircleTime / this.frames;
    this.target = target;
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

  private draw = () => {
    if (this.sX === null) {
      throw new Error("sX is null");
    }

    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      0, // sY
      this.sWidth,
      this.sHeight,
      this.target.x + this.imageTranslateCorrection.x,
      this.target.y + this.imageTranslateCorrection.y,
      this.sWidth * this.imageScale,
      this.sHeight * this.imageScale
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
