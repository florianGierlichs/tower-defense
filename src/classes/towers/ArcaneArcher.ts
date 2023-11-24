import shortUUID from "short-uuid";
import {
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
} from "../../utils/types";
import { Projectile } from "../projectiles/Projectile";
import { Tower } from "./Tower";

export class ArcaneArcher extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.ARCANE_ARCHER,
    name: "Arcane Archer",
    description: "Shoots a magic arrow that deals damage to a single enemy.",
    range: 250,
    attackSpeed: 100,
    damage: 5,
    sWidth: 64,
    sHeight: 64,
    imageScale: 1.1,
    imageTranslateCorrection: {
      x: 0,
      y: 5,
    },
    frameConfig: {
      idle: {
        frames: 4,
        animationIterationCircleTime: 600,
        flipOffsetFrames: 4,
        animationStartRight: {
          sx: 0,
          sy: 320,
        },
        animationStartLeft: {
          sx: 448,
          sy: 832,
        },
      },
      attack: {
        frames: 7,
        animationIterationCircleTime: 400,
        flipOffsetFrames: 1,
        animationStartRight: {
          sx: 0,
          sy: 192,
        },
        animationStartLeft: {
          sx: 448,
          sy: 704,
        },
      },
    },
    cancelAttackAnimantionAllowed: true,
    projectile: {
      id: ProjectileId.ARCANE_ARCHER,
      width: 40,
      height: 5,
    },
    bluePrint: {
      id: BlueprintId.ARCANE_ARCHER,
    },
  };

  id;
  projectileSpeed = 20;

  constructor(id: string, x: number, y: number) {
    super(id, x, y, ArcaneArcher.config);
    this.id = id;
  }

  getProjectile = () => {
    if (this.currentTarget === null) {
      throw new Error("No current target");
    }

    return new Projectile(
      shortUUID.generate(),
      this.tileMiddle.x,
      this.tileMiddle.y,
      ArcaneArcher.config.damage,
      this.projectileSpeed,
      {
        img: this.projectileImg,
        width: this.projectileWidth,
        height: this.projectileHeight,
      },
      this.currentTarget,
      this.removeProjectile,
      this.id
    );
  };

  update = () => {
    super.update({ shootAtFrame: 6, getProjectile: this.getProjectile });
  };
}
