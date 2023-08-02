import { loadImage } from "../utils/loadImage";
import { EnemyName } from "./Waves";
import { TowerBpName, TowerName, TowerProjectileName } from "./Menu";
import arcaneArcherImg from "../assets/arcaneArcher.png";
import arcaneArcherProjectileImg from "../assets/arcaneArcherProjectile.png";
import arcaneArcherBpImg from "../assets/arcaneArcherMenu.png";
import texturesImg from "../assets/textures.png";
import skeletonShieldImg from "../assets/skeletonShield.png";

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
  //someEnemy: HTMLImageElement | null = null;

  loadImages = async () => {
    this.textures = await loadImage(texturesImg);

    // tower
    this.arcaneArcher = await loadImage(arcaneArcherImg);
    this.arcaneArcherProjectile = await loadImage(arcaneArcherProjectileImg);
    this.arcaneArcherBp = await loadImage(arcaneArcherBpImg);

    // enemy
    this.skeletonShield = await loadImage(skeletonShieldImg);
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
