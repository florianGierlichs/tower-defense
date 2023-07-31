import { loadImage } from "../utils/loadImage";
import arcaneArcherBp from "../assets/arcaneArcherMenu.png";
import textures from "../assets/textures.png";
import skeleton from "../assets/skeletonShield.png";
import { TOWER_CONFIGS, TowerConfig } from "../data/towerConfig";
import { EnemyNames } from "./Waves";

// https://astrobob.itch.io/arcane-archer
// https://cainos.itch.io/pixel-art-top-down-basic
// https://luizmelo.itch.io/monsters-creatures-fantasy

const texturesKey = "textures";

export class ImageController {
  arcaneArcherBpImage: HTMLImageElement | null = null;
  textures: HTMLImageElement | null = null; // todo prio name clash with import names
  skeleton: HTMLImageElement | null = null;

  loadImages = async () => {
    this.arcaneArcherBpImage = await loadImage(arcaneArcherBp);
    this.textures = await loadImage(textures);
    this.skeleton = await loadImage(skeleton);
  };

  getImage = (key: TowerConfig | typeof texturesKey | EnemyNames) => {
    // const a: typeof texturesKey = "textures";
    // console.log("test should be textures: HTMLImageElement | null", this[a]); // TODO maybe instead of switch case use this[key]?
    if (!this.arcaneArcherBpImage || !this.textures || !this.skeleton) {
      throw new Error("Images not loaded yet");
    }

    switch (key) {
      case TOWER_CONFIGS.arcaneArcher:
        return this.arcaneArcherBpImage;

      case texturesKey:
        return this.textures;

      case "skeletonShield":
        return this.skeleton;

      default:
        return this.arcaneArcherBpImage;
    }
  };
}
