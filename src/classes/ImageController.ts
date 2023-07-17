import { loadImage } from "../utils/loadImage";
import arcaneArcherBp from "../assets/arcaneArcherMenu.png";
import textures from "../assets/textures.png";
import { TowerType } from "./Game";

const texturesKey = "textures";

export class ImageController {
  arcaneArcherBpImage: HTMLImageElement | null = null;
  textures: HTMLImageElement | null = null;

  loadImages = async () => {
    this.arcaneArcherBpImage = await loadImage(arcaneArcherBp);
    this.textures = await loadImage(textures);
  };

  getImage = (key: TowerType | typeof texturesKey) => {
    switch (key) {
      case TowerType.arcaneArcher:
        return this.arcaneArcherBpImage;

      case texturesKey:
        return this.textures;

      default:
        return this.arcaneArcherBpImage;
    }
  };
}
