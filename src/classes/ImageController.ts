import { loadImage } from "../utils/loadImage";
import { TowerName } from "./Game";

import arcaneArcherBp from "../assets/arcaneArcherMenu.png";
import textures from "../assets/textures.png";

export class ImageController {
  arcaneArcherBpImage: HTMLImageElement | null = null;
  textures: HTMLImageElement | null = null;

  loadImages = async () => {
    this.arcaneArcherBpImage = await loadImage(arcaneArcherBp);
    this.textures = await loadImage(textures);
  };

  getImage = (key: TowerName | "textures") => {
    // PRIO TODO use ENUM, TowerName needs to be refactored
    switch (key) {
      case "arcaneArcher":
        return this.arcaneArcherBpImage;

      case "textures":
        return this.textures;

      default:
        return this.arcaneArcherBpImage;
    }
  };
}
