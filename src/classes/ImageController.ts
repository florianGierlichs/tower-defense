import { loadImage } from "../utils/loadImage";
import {
  BlueprintId,
  BossId,
  EnemyId,
  ProjectileId,
  TowerId,
} from "../utils/types";
import arcaneArcherImg from "../assets/tower/arcaneArcher.png";
import arcaneArcherProjectileImg from "../assets/projectiles/arcaneArcherProjectile.png";
import arcaneArcherBpImg from "../assets/towerBlueprint/arcaneArcherBp.png";
import texturesImg from "../assets/textures.png";
import skeletonShieldImg from "../assets/enemy/skeletonShield.png";
import mushroomImg from "../assets/enemy/mushroom.png";
import goblinImg from "../assets/enemy/goblin.png";
import skeletonWarrior from "../assets/enemy/SkeletonWarrior.png";
import fireMageImg from "../assets/tower/fireMage.png";
import fireMageProjectileImg from "../assets/projectiles/fireMageProjectile.png";
import fireMageBpImg from "../assets/towerBlueprint/fireMageBp.png";
import fireWorm from "../assets/enemy/fireWorm.png";
import demon from "../assets/boss/demon.png";
import lightningMageImg from "../assets/tower/lightningMage.png";
import lightningMageProjectileImg from "../assets/projectiles/lightningMageProjectile.png";
import lightningMageBpImg from "../assets/towerBlueprint/lightningMageBp.png";

const texturesKey = "textures";

export class ImageController {
  textures: HTMLImageElement | null = null;

  // tower
  arcaneArcher: HTMLImageElement | null = null;
  arcaneArcherProjectile: HTMLImageElement | null = null;
  arcaneArcherBp: HTMLImageElement | null = null;

  fireMage: HTMLImageElement | null = null;
  fireMageProjectile: HTMLImageElement | null = null;
  fireMageBp: HTMLImageElement | null = null;

  lightningMage: HTMLImageElement | null = null;
  lightningMageProjectile: HTMLImageElement | null = null;
  lightningMageBp: HTMLImageElement | null = null;

  // enemy
  skeletonShield: HTMLImageElement | null = null;
  mushroom: HTMLImageElement | null = null;
  goblin: HTMLImageElement | null = null;
  fireWorm: HTMLImageElement | null = null;
  skeletonWarrior: HTMLImageElement | null = null;

  // boss
  demon: HTMLImageElement | null = null;

  loadImages = async () => {
    this.textures = await loadImage(texturesImg);

    // tower
    this.arcaneArcher = await loadImage(arcaneArcherImg);
    this.arcaneArcherProjectile = await loadImage(arcaneArcherProjectileImg);
    this.arcaneArcherBp = await loadImage(arcaneArcherBpImg);

    this.fireMage = await loadImage(fireMageImg);
    this.fireMageProjectile = await loadImage(fireMageProjectileImg);
    this.fireMageBp = await loadImage(fireMageBpImg);

    this.lightningMage = await loadImage(lightningMageImg);
    this.lightningMageProjectile = await loadImage(lightningMageProjectileImg);
    this.lightningMageBp = await loadImage(lightningMageBpImg);

    // enemy
    this.skeletonShield = await loadImage(skeletonShieldImg);
    this.mushroom = await loadImage(mushroomImg);
    this.goblin = await loadImage(goblinImg);
    this.fireWorm = await loadImage(fireWorm);
    this.skeletonWarrior = await loadImage(skeletonWarrior);

    // boss
    this.demon = await loadImage(demon);
  };

  getImage = (
    key:
      | typeof texturesKey
      | TowerId
      | ProjectileId
      | BlueprintId
      | EnemyId
      | BossId
  ): HTMLImageElement => {
    const image = this[key];
    if (image === null) {
      throw new Error("Images not loaded yet");
    }

    return image;
  };
}
