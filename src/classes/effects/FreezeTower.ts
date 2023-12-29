import { dom, main } from "../../main";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { EffectId, TowerInstance } from "../../utils/types";
import { Obelisk } from "../towers/Obelisk";

interface FreezeTowerProps {
  id: string;
  target: TowerInstance;
}

export class FreezeTower {
  id;
  private target;
  duration = 2500;
  freezeStart;

  private image: HTMLImageElement;
  private sWidth = 32;
  private sHeight = 32;
  private imageScale = 1.5;
  private imageTranslateCorrection = {
    x: (64 - this.sWidth * this.imageScale) / 2,
    y: 0,
  };

  // frames
  frameIteration = 0;
  frames = 15;
  sX: number | null = null;
  frameIterationThrottleTime = this.duration / this.frames;
  lastFrameIteration: number | null = null;

  constructor({ id, target }: FreezeTowerProps) {
    this.id = id;
    this.target = target;
    this.freezeStart = performance.now();

    this.image = main.imageController.getImage(EffectId.FREEZE_TOWER);

    setTimeout(() => {
      if (this.target instanceof Obelisk) return; // needs to be changed if more buff towers are added

      this.target.resetAfterStun();
    }, this.duration);
  }

  private setFrameIteration = () => {
    this.frameIteration++;
  };

  private setSxFrame = () => {
    this.sX = this.frameIteration * this.sWidth;
  };

  private draw = () => {
    if (this.sX === null) {
      throw new Error("sX or sY is null");
    }

    if (this.frameIteration === this.frames) {
      throw new Error("frameIteration is equal to frames");
    }

    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      0,
      this.sWidth,
      this.sHeight,
      this.target.x + this.imageTranslateCorrection.x,
      this.target.y,
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
        if (this.frameIteration === this.frames) {
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
