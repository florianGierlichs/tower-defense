import shortUUID from "short-uuid";
import {
  AnimationDirection,
  BlueprintId,
  ProjectileId,
  TowerConfig,
  TowerId,
} from "../../utils/types";
import { Tower } from "./Tower";
import { Fireball } from "../projectiles/Fireball";
import { FireExplosion } from "../effects/FireExplosion";

export class DemonMage extends Tower {
  static readonly config: TowerConfig = {
    id: TowerId.DEMON_MAGE,
    name: "Demon Mage",
    description: "Shoots a magic arrow that deals damage to a single enemy.",
    range: 200,
    attackSpeed: 40,
    damage: 30,
    sWidth: 160,
    sHeight: 128,
    imageScale: 0.9,
    imageTranslateCorrection: {
      x: -50,
      y: -50,
    },
    frameConfig: {
      idle: {
        frames: 8,
        animationIterationCircleTime: 800,
        flipOffsetFrames: 4,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1760,
          sy: 256,
        },
      },
      attack: {
        frames: 12,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 128,
        },
        animationStartLeft: {
          sx: 1760,
          sy: 384,
        },
      },
    },
    cancelAttackAnimantionAllowed: true,
    projectile: {
      id: ProjectileId.DEMON_MAGE,
      width: 74,
      height: 13,
    },
    bluePrint: {
      id: BlueprintId.DEMON_MAGE,
    },
  };

  id;
  projectileSpeed = 15;

  fireExplosions: FireExplosion[] = [];

  constructor(id: string, x: number, y: number) {
    super(id, x, y, DemonMage.config);
    this.id = id;
  }

  getProjectile = () => {
    if (this.currentTarget === null) {
      throw new Error("No current target");
    }

    return new Fireball({
      id: shortUUID.generate(),
      x: this.tileMiddle.x + this.getProjectileStartPositionX(),
      y: this.tileMiddle.y,
      damage: DemonMage.config.damage,
      speed: this.projectileSpeed,
      imgConfig: {
        img: this.projectileImg,
        width: this.projectileWidth,
        height: this.projectileHeight,
      },
      targetEnemy: this.currentTarget,
      removeProjectile: this.removeProjectile,
      towerSourceId: this.id,
      explosion: {
        add: this.addFireExplosion,
        remove: this.removeFireExplosion,
      },
    });
  };

  private getProjectileStartPositionX = () => {
    const moveXFromMiddle = 40;
    return this.animationDirection === AnimationDirection.RIGHT
      ? moveXFromMiddle
      : -moveXFromMiddle;
  };

  addFireExplosion = (fireExplosion: FireExplosion) => {
    this.fireExplosions.push(fireExplosion);
  };

  removeFireExplosion = (id: string) => {
    this.fireExplosions = this.fireExplosions.filter(
      (fireExplosion) => fireExplosion.id !== id
    );
  };

  private updateFireExplosions = () => {
    this.fireExplosions.forEach((fireExplosion) => {
      fireExplosion.update();
    });
  };

  update = () => {
    super.update({ shootAtFrame: 6, getProjectile: this.getProjectile });
    this.updateFireExplosions();
  };
}
