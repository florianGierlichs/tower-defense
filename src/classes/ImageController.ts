import { loadImage } from "../utils/loadImage";
import { EnemyName } from "./Waves";
import { TowerBpName, TowerName, TowerProjectileName } from "./Menu";
import arcaneArcherImg from "../assets/tower/arcaneArcher.png";
import arcaneArcherProjectileImg from "../assets/projectiles/arcaneArcherProjectile.png";
import arcaneArcherBpImg from "../assets/menu/arcaneArcherMenu.png";
import texturesImg from "../assets/textures.png";
import skeletonShieldImg from "../assets/enemy/skeletonShield.png";
import mushroom from "../assets/enemy/mushroom.png";

const texturesKey = "textures";

export class ImageController {
  textures: HTMLImageElement | null = null;

  // tower
  arcaneArcher: HTMLImageElement | null = null;
  arcaneArcherProjectile: HTMLImageElement | null = null;
  arcaneArcherBp: HTMLImageElement | null = null;
  //someTower: HTMLImageElement | null = null;

  // enemy
  skeletonShield: HTMLImageElement | null = null;
  mushroom: HTMLImageElement | null = null;

  loadImages = async () => {
    this.textures = await loadImage(texturesImg);

    // tower
    this.arcaneArcher = await loadImage(arcaneArcherImg);
    this.arcaneArcherProjectile = await loadImage(arcaneArcherProjectileImg);
    this.arcaneArcherBp = await loadImage(arcaneArcherBpImg);

    // enemy
    this.skeletonShield = await loadImage(skeletonShieldImg);
    this.mushroom = await loadImage(mushroom);
  };

  getImage = (
    key:
      | typeof texturesKey
      | TowerName
      | TowerProjectileName
      | TowerBpName
      | EnemyName
  ): HTMLImageElement => {
    const image = this[key];
    if (image === null) {
      throw new Error("Images not loaded yet");
    }

    return image;
  };
}
