import shortUUID from "short-uuid";
import { dom, game, main } from "../../main";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { SkeletonGuard } from "./SkeletonGuard";

interface SkeletonGuardSpawnProps {
  id: string;
  x: number;
  y: number;
  index: number;
  removeSpawn: (id: string) => void;
}

export class SkeletonGuardSpawn {
  id;
  x;
  y;
  index;
  removeSpawn;

  image = main.imageController.getEnemyImage("skeletonGuardSpawn");
  sWidth = 33;
  sHeight = 32;
  imageScale = 1.6;
  dWidth = this.imageScale * this.sWidth;
  dHeight = this.imageScale * this.sHeight;
  imageTranslateCorrection = {
    x: -30,
    y: -45,
  };
  frames = 10;
  frameIteration = 0;
  animationIterationCircleTime = 1000;
  sX: number | null = null;
  sY = 0;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  lastFrameIteration: number | null = null;

  constructor({ id, x, y, index, removeSpawn }: SkeletonGuardSpawnProps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.index = index;
    this.removeSpawn = removeSpawn;
  }

  private setFrameIteration = () => {
    this.frameIteration++;
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
        if (this.frameIteration === this.frames) {
          const minion = new SkeletonGuard(
            shortUUID.generate(),
            this.x,
            this.y
          );

          minion.setNodeIndex(this.index - 1); // -1 because updateNodeTarget increments the index
          minion.updateNodeTarget();
          game.enemies.currentEnemiesPush(minion);
          this.removeSpawn(this.id);
          return false;
        }
        this.setSxFrame();
        this.lastFrameIteration = performance.now();
      }
    }
    return true;
  };

  private draw = () => {
    if (this.sX === null) {
      throw new Error("sX  is null");
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
      this.x + this.imageTranslateCorrection.x,
      this.y + this.imageTranslateCorrection.y,
      this.dWidth,
      this.dHeight
    );
  };

  update = () => {
    if (this.updateFrames() === false) return;

    this.draw();
  };
}
