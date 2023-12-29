import { Buff, TowerInstance } from "../../utils/types";
import { Obelisk } from "../towers/Obelisk";

interface ObeliskBuffProps {
  id: string;
  target: TowerInstance;
}

export class ObeliskBuff {
  id;
  target;
  duration = 10000;
  start;
  damageMultiplier = 1.5;

  // private image: HTMLImageElement;
  // private sWidth = 32;
  // private sHeight = 32;
  // private imageScale = 1.5;
  // private imageTranslateCorrection = {
  //     x: (64 - this.sWidth * this.imageScale) / 2,
  //     y: 0,
  // };

  // frames
  // frameIteration = 0;
  // frames = 15;
  // sX: number | null = null;
  // frameIterationThrottleTime = this.duration / this.frames;
  // lastFrameIteration: number | null = null;

  constructor({ id, target }: ObeliskBuffProps) {
    this.id = id;
    this.target = target;
    this.start = performance.now();

    // this.image = main.imageController.getImage(EffectId.FREEZE_TOWER);
    this.add();

    // setTimeout(() => {
    //   // this.target.removeBuff();
    // }, this.duration);
  }

  // private setFrameIteration = () => {
  //     this.frameIteration++;
  // };

  // private setSxFrame = () => {
  //     this.sX = this.frameIteration * this.sWidth;
  // };

  // private draw = () => {
  //     if (this.sX === null) {
  //     throw new Error("sX or sY is null");
  //     }

  //     if (this.frameIteration === this.frames) {
  //     throw new Error("frameIteration is equal to frames");
  //     }

  //     dom.ctxGame.drawImage(
  //     this.image,
  //     this.sX,
  //     0,
  //     this.sWidth,
  //     this.sHeight,
  //     this.target.x + this.imageTranslateCorrection.x,
  //     this.target.y + this.imageTranslateCorrection.y,
  //     this.sWidth * this.imageScale,
  //     this.sHeight * this.imageScale
  //     );
  // };

  private add = () => {
    if (!(this.target instanceof Obelisk)) {
      // needs to be changed if more buff towers are added

      this.target.addBuffId(Buff.OBELISK_BUFF);
      this.target.addDamageBuffMultiplier(this.damageMultiplier);
    }
  };

  remove = () => {
    if (!(this.target instanceof Obelisk)) {
      // needs to be changed if more buff towers are added

      this.target.removeBuffId(Buff.OBELISK_BUFF);
      this.target.removeDamageBuffMultiplier(this.damageMultiplier);
    }
  };

  update = () => {
    // if (this.lastFrameIteration === null) {
    // this.lastFrameIteration = performance.now();
    // }
    // if (
    // timeHasPassed(
    //     this.lastFrameIteration,
    //     this.frameIterationThrottleTime,
    //     this.setFrameIteration
    // )
    // ) {
    // this.setSxFrame();
    // }
    // this.draw();
  };
}
