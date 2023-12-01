import shortUUID from "short-uuid";
import { dom, main } from "../../main";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { EffectId } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";
import { Aoe } from "./Aoe";

interface FireExplosionProps {
  id: string;
  targetEnemy: Enemy;
  remove: (id: string) => void;
  damage: number;
  towerSourceId: string;
}

export class FireExplosion {
  id;
  private x;
  private y;
  private remove;
  private radius = 70;
  private damage;
  private towerSourceId;

  private image: HTMLImageElement;
  private sWidth = 192;
  private sHeight = 128;
  private imageScale = 1;
  private imageTranslateCorrection = {
    x: -(this.sWidth * this.imageScale) / 2,
    y: -((this.sHeight + 40) * this.imageScale) / 2,
  };

  // frames
  frameIteration = 0;
  frames = 10;
  sX: number | null = null;
  private duration = 800;
  frameIterationThrottleTime = this.duration / this.frames;
  lastFrameIteration: number | null = null;

  constructor({
    id,
    targetEnemy,
    remove,
    damage,
    towerSourceId,
  }: FireExplosionProps) {
    this.id = id;
    this.x = targetEnemy.x;
    this.y = targetEnemy.y;
    this.remove = remove;
    this.damage = damage;
    this.towerSourceId = towerSourceId;

    this.image = main.imageController.getImage(EffectId.FIRE_EXPLOSION);

    new Aoe(
      shortUUID.generate(),
      this.x,
      this.y,
      this.radius,
      this.damage,
      this.towerSourceId
    );
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
      this.x + this.imageTranslateCorrection.x,
      this.y + this.imageTranslateCorrection.y,
      this.sWidth * this.imageScale,
      this.sHeight * this.imageScale
    );

    dom.ctxGame.beginPath();
    dom.ctxGame.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    dom.ctxGame.stroke();
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
          this.remove(this.id);
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
