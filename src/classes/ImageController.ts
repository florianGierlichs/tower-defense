import { loadImage } from "../utils/loadImage";
import { EnemyName } from "./Waves";
import { BlueprintId, ProjectileId, TowerId } from "../utils/types";
import arcaneArcherImg from "../assets/tower/arcaneArcher.png";
import arcaneArcherProjectileImg from "../assets/projectiles/arcaneArcherProjectile.png";
import arcaneArcherBpImg from "../assets/menu/arcaneArcherMenu.png";
import texturesImg from "../assets/textures.png";
import skeletonShieldImg from "../assets/enemy/skeletonShield.png";
import mushroomImg from "../assets/enemy/mushroom.png";
import goblinImg from "../assets/enemy/goblin.png";
import fireMageImg from "../assets/tower/fireMage.png";
import fireMageProjectileImg from "../assets/projectiles/fireMageProjectile.png";

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

  loadImages = async () => {
    this.textures = await loadImage(texturesImg);

    // tower
    this.arcaneArcher = await loadImage(arcaneArcherImg);
    this.arcaneArcherProjectile = await loadImage(arcaneArcherProjectileImg);
    this.arcaneArcherBp = await loadImage(arcaneArcherBpImg);

    this.fireMage = await loadImage(fireMageImg);
    this.fireMageProjectile = await loadImage(fireMageProjectileImg);
    this.fireMageBp = await loadImage(arcaneArcherBpImg);

    // enemy
    this.skeletonShield = await loadImage(skeletonShieldImg);
    this.mushroom = await loadImage(mushroomImg);
    this.goblin = await loadImage(goblinImg);
  };

  getImage = (
    key: typeof texturesKey | TowerId | ProjectileId | BlueprintId | EnemyName
  ): HTMLImageElement => {
    const image = this[key];
    if (image === null) {
      throw new Error("Images not loaded yet");
    }

    return image;
  };
}
