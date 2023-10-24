import { BossId, EnemyId } from "../../utils/types";
import { loadImage } from "../../utils/loadImage";

// Enemy
import skeletonShield from "../../assets/enemy/skeletonShield.png";
import mushroom from "../../assets/enemy/mushroom.png";
import goblin from "../../assets/enemy/goblin.png";
import skeletonGuard from "../../assets/enemy/skeletonGuard.png";
import chainedGolem from "../../assets/enemy/chainedGolem.png";
import terrorWolf from "../../assets/enemy/terrorWolf.png";
import bloodyBat from "../../assets/enemy/blooyBat.png";
import evilWitch from "../../assets/enemy/evilWitch.png";
import fireWorm from "../../assets/enemy/fireWorm.png";
import skeletonArcher from "../../assets/enemy/skeletonArcher.png";

// Boss
import demon from "../../assets/boss/demon.png";

export class EnemyAssets {
  constructor() {}

  getAssets = async (): Promise<Record<EnemyId | BossId, HTMLImageElement>> => {
    return {
      // Enemy
      skeletonShield: await loadImage(skeletonShield),
      mushroom: await loadImage(mushroom),
      goblin: await loadImage(goblin),
      skeletonGuard: await loadImage(skeletonGuard),
      chainedGolem: await loadImage(chainedGolem),
      terrorWolf: await loadImage(terrorWolf),
      bloodyBat: await loadImage(bloodyBat),
      evilWitch: await loadImage(evilWitch),
      fireWorm: await loadImage(fireWorm),
      skeletonArcher: await loadImage(skeletonArcher),

      // Boss
      demon: await loadImage(demon),
    };
  };
}
