import { loadImage } from "../utils/loadImage";
import arcaneArcherBp from "../assets/arcaneArcherMenu.png";
import textures from "../assets/textures.png";
import { TOWER_CONFIGS, TowerConfig } from "../data/towerConfig";

const texturesKey = "textures";

export class ImageController {
  arcaneArcherBpImage: HTMLImageElement | null = null;
  textures: HTMLImageElement | null = null;

  loadImages = async () => {
    this.arcaneArcherBpImage = await loadImage(arcaneArcherBp);
    this.textures = await loadImage(textures);
  };

  getImage = (tower: TowerConfig | typeof texturesKey) => {
    // const a: typeof texturesKey = "textures";
    // console.log("test should be textures: HTMLImageElement | null", this[a]); // TODO maybe instead of switch case use this[key]?
    switch (tower) {
      case TOWER_CONFIGS.arcaneArcher:
        return this.arcaneArcherBpImage;

      case texturesKey:
        return this.textures;

      default:
        return this.arcaneArcherBpImage;
    }
  };
}
