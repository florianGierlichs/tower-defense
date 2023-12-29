import shortUUID from "short-uuid";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
} from "../../utils/types";
import { Tower } from "./Tower";
import { LightningBolt } from "../projectiles/LightningBolt";

export class LightningMage extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.Lightning_MAGE,
    name: "Lightning Mage",
    description:
      "Summons a lightning bolt to damage and slow enemies for 30% in an area.",
    range: 200,
    attackSpeed: 30,
    damage: 10,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.2,
    imageTranslateCorrection: {
      x: 0,
      y: -5,
    },
    frameConfig: {
      idle: {
        frames: 8,
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
    cancelAttackAnimantionAllowed: false,
    projectile: {
      id: ProjectileId.LIGHTNING_MAGE,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.LIGHTNING_MAGE,
    },
  };

  id;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, LightningMage.config);
    this.id = id;
  }

  getProjectile = () => {
    if (this.targetFallbackCoordinates === null) {
      throw new Error("No current target");
    }

    return new LightningBolt(
      shortUUID.generate(),
      this.tileMiddle.x,
      this.tileMiddle.y,
      this.getCurrentDamage(),
      this.projectileImg,
      this.currentTarget || this.targetFallbackCoordinates,
      this.removeProjectile,
      this.id
    );
  };

  update = () => {
    super.update({ shootAtFrame: 10, getProjectile: this.getProjectile });
  };
}
