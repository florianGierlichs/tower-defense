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
import arcaneArcherBpImg from "../assets/menu/arcaneArcherMenu.png";
import texturesImg from "../assets/textures.png";
import skeletonShieldImg from "../assets/enemy/skeletonShield.png";
import mushroomImg from "../assets/enemy/mushroom.png";
import goblinImg from "../assets/enemy/goblin.png";
import fireMageImg from "../assets/tower/fireMage.png";
import fireMageProjectileImg from "../assets/projectiles/fireMageProjectile.png";
import fireMageBpImg from "../assets/menu/fireMageMenu.png";
import fireWorm from "../assets/enemy/fireWorm.png";
import demon from "../assets/boss/demon.png";

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

  // enemy
  skeletonShield: HTMLImageElement | null = null;
  mushroom: HTMLImageElement | null = null;
  goblin: HTMLImageElement | null = null;
  fireWorm: HTMLImageElement | null = null;

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

    // enemy
    this.skeletonShield = await loadImage(skeletonShieldImg);
    this.mushroom = await loadImage(mushroomImg);
    this.goblin = await loadImage(goblinImg);
    this.fireWorm = await loadImage(fireWorm);

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
