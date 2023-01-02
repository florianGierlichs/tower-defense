import arcaneArcher from "../assets/arcaneArcher.png";
import { ctxGame } from "../main";
import { loadImage } from "../utils/loadImage";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Tower } from "./Tower";

type towerState = "idle" | "attack";

interface ImgConfig {
  frames: number;
  sx: number;
  sy: number;
}

const imageConfigs: Record<towerState, ImgConfig> = {
  idle: {
    frames: 4,
    sx: 0,
    sy: 320,
  },
  attack: {
    frames: 7,
    sx: 0,
    sy: 192,
  },
};

let arcaneArcherImage: HTMLImageElement;
(async () => {
  arcaneArcherImage = await loadImage(arcaneArcher);
})();

export class TowerArcaneArcher extends Tower {
  image: HTMLImageElement;
  sWidth: number = 64;
  sHeight: number = this.sWidth;
  dWidth: number = 64;
  dHeight: number = this.dWidth;
  dX: number;
  dY: number;
  sX: number;
  sY: number;
  frames: number;
  frameIteration: number = 0;
  lastFrameIteration: number | null = null;
  frameIterationThrottleTime: number = 100;
  state: towerState = "idle";

  constructor(id: string, x: number, y: number) {
    super(id, x, y);

    this.image = arcaneArcherImage;

    this.dX = x;
    this.dY = y;

    this.sX = this.getImgConfig().sx;
    this.sY = this.getImgConfig().sy;
    this.frames = this.getImgConfig().frames;
  }

  private getImgConfig = () => {
    let imageConfig: ImgConfig;
    switch (this.state) {
      case "idle":
        imageConfig = imageConfigs.idle;
        break;
      default:
        imageConfig = imageConfigs.attack;
    }
    return imageConfig;
  };

  private drawImg = () => {
    ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.dX,
      this.dY,
      this.dWidth,
      this.dHeight
    );
  };

  private setFrame = () => {
    if (
      timeHasPassed(this.lastFrameIteration, this.frameIterationThrottleTime)
    ) {
      this.sX = this.frameIteration * this.sWidth;

      if (this.frameIteration < this.frames - 1) {
        this.frameIteration++;
      } else {
        this.frameIteration = 0;
      }

      this.lastFrameIteration = performance.now();
    }
  };

  update = () => {
    this.setFrame();
    this.drawImg();

    this.updateProperties();
  };
}
