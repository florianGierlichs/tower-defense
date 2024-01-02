import shortUUID from "short-uuid";
import { dom, game, main } from "../../main";
import { getTileMiddle } from "../../utils/getTileMiddle";
import { timeHasPassed } from "../../utils/timeHasPassed";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
  TowerInstance,
} from "../../utils/types";
import { ObeliskBuff } from "../effects/ObeliskBuff";
import { findRandomTower } from "../../utils/findRandomTower";
import { filterUnbuffedTowers } from "../../utils/filterUnbuffedTowers";
import { getTranslatedCanvasDestination } from "../../utils/getTranslatedCanvasDestination";
import { filterTowersInRange } from "../../utils/filterTowersInRange";

interface ObeliskProps {
  id: string;
  x: number;
  y: number;
}

export class Obelisk {
  static readonly config: TowerConfig = {
    id: TowerId.OBELISK,
    name: "Obelisk",
    description:
      "Amplifies the damage of up to three towers by 20% for 10 seconds.",
    range: 130,
    attackSpeed: 20,
    damage: 20, // used as percentage to calculate damage multiplier
    sWidth: 200,
    sHeight: 400,
    imageScale: 0.17,
    imageTranslateCorrection: {
      x: -70,
      y: -170,
    },
    frameConfig: {
      idle: {
        frames: 13,
        animationIterationCircleTime: 800,
        flipOffsetFrames: 8,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 960,
          sy: 128,
        },
      },
      attack: {
        // not used, only for type checking because of lazyness
        frames: 16,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 64,
        },
        animationStartLeft: {
          sx: 960,
          sy: 192,
        },
      },
    },
    cancelAttackAnimantionAllowed: false, // not used, only for type checking because of lazyness
    projectile: {
      id: ProjectileId.LIGHTNING_MAGE, // not used, only for type checking because of lazyness
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.OBELISK,
    },
  };

  // initial values
  id;
  x;
  y;
  tileMiddle;
  range = Obelisk.config.range;
  buffSpeed = Obelisk.config.attackSpeed; // buffs per minute
  buffSpeedThrottleTime = (60 / this.buffSpeed) * 1000;
  lastBuff: number | null = null;
  maxBuffs = 3;

  image = main.imageController.getImage(Obelisk.config.id);
  imageScale = Obelisk.config.imageScale;
  sWidth = Obelisk.config.sWidth;
  sHeight = Obelisk.config.sHeight;
  dWidth = this.sWidth * this.imageScale;
  dHeight = this.sHeight * this.imageScale;

  imageTranslateX = getTranslatedCanvasDestination({
    imageScale: this.imageScale,
    sourceSize: this.sWidth,
    translateCorrection: Obelisk.config.imageTranslateCorrection.x,
  });
  imageTranslateY = getTranslatedCanvasDestination({
    imageScale: this.imageScale,
    sourceSize: this.sHeight,
    translateCorrection: Obelisk.config.imageTranslateCorrection.y,
  });

  frameIteration = 0;
  frames = Obelisk.config.frameConfig.idle.frames;
  animationIterationCircleTime =
    Obelisk.config.frameConfig.idle.animationIterationCircleTime;
  frameIterationThrottleTime = this.animationIterationCircleTime / this.frames;
  sX = 0;
  sY = 0;
  lastFrameIteration: number | null = null;

  // states
  showRange = false;
  newAnimationCycle = true;

  // data
  currentBuffs: ObeliskBuff[] = [];

  constructor({ id, x, y }: ObeliskProps) {
    this.id = id;
    this.x = x;
    this.y = y;

    this.tileMiddle = getTileMiddle({ x, y });
  }

  private setFrameIteration = () => {
    if (this.frameIteration < this.frames - 1) {
      this.frameIteration++;
    } else {
      this.frameIteration = 0;
      this.newAnimationCycle = true;
    }
  };

  private setSxFrame = () => {
    this.sX = this.frameIteration * this.sWidth;
  };

  updateFrames = () => {
    if (this.newAnimationCycle === true) {
      this.setSxFrame();
      this.lastFrameIteration = performance.now();
      this.newAnimationCycle = false;
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

  private drawImg = () => {
    dom.ctxGame.drawImage(
      this.image,
      this.sX,
      this.sY,
      this.sWidth,
      this.sHeight,
      this.x + this.imageTranslateX,
      this.y + this.imageTranslateY,
      this.dWidth,
      this.dHeight
    );
  };

  private drawRange = () => {
    dom.ctxGame.beginPath();
    dom.ctxGame.arc(
      this.tileMiddle.x,
      this.tileMiddle.y,
      this.range,
      0,
      Math.PI * 2
    );
    dom.ctxGame.fillStyle = "rgba(225,225,225,0.1)";
    dom.ctxGame.fill();
  };

  setShowRange = (show: boolean) => {
    this.showRange = show;
  };

  private addBuff = (tower: TowerInstance) => {
    this.currentBuffs.push(
      new ObeliskBuff({ id: shortUUID.generate(), target: tower })
    );
    this.lastBuff = performance.now();
  };

  private removeBuff = (tower: TowerInstance) => {
    const buff = this.currentBuffs.find((buff) => buff.target.id === tower.id);
    if (!buff) {
      throw new Error("No buff found");
    }
    buff.remove();

    this.currentBuffs = this.currentBuffs.filter(
      (b) => b.target.id !== buff.target.id
    );
  };

  private updateBuffs = () => {
    const now = performance.now();
    this.currentBuffs.forEach((buff) => {
      if (now - buff.start >= buff.duration) {
        this.removeBuff(buff.target);
      }
    });
  };

  private findRandomUnbuffedTowerInRange = () => {
    const towers = filterTowersInRange({
      towers: game.towers.getAllTowers(),
      center: this.tileMiddle,
      range: this.range,
    });

    return findRandomTower(filterUnbuffedTowers(towers));
  };

  update() {
    this.updateFrames();
    this.drawImg();

    if (
      this.currentBuffs.length < this.maxBuffs &&
      timeHasPassed(this.lastBuff, this.buffSpeedThrottleTime)
    ) {
      const tower = this.findRandomUnbuffedTowerInRange();
      if (tower) {
        this.addBuff(tower);
      }
    }

    if (this.showRange) {
      this.drawRange();
    }

    this.updateBuffs();
  }
}
