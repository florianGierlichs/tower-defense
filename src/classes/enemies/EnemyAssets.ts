import { BossId, EnemyId } from "../../utils/types";
import { loadImage } from "../../utils/loadImage";

// Enemy
import skeletonShield from "../../assets/enemy/skeletonShield.png";
import mushroom from "../../assets/enemy/mushroom.png";
import goblin from "../../assets/enemy/goblin.png";
import skeletonGuard from "../../assets/enemy/skeletonGuard.png";
import skeletonGuardSpawn from "../../assets/enemy/skeletonGuardSpawn.png";
import chainedGolem from "../../assets/enemy/chainedGolem.png";
import terrorWolf from "../../assets/enemy/terrorWolf.png";
import bloodyBat from "../../assets/enemy/blooyBat.png";
import evilWitch from "../../assets/enemy/evilWitch.png";
import fireWorm from "../../assets/enemy/fireWorm.png";
import skeletonArcher from "../../assets/enemy/skeletonArcher.png";
import skeletonWarrior from "../../assets/enemy/skeletonWarrior.png";
import necromancer from "../../assets/enemy/necromancer.png";
import skeletonCat from "../../assets/enemy/skeletonCat.png";

// Boss
import demon from "../../assets/boss/demon.png";
import frostGuardian from "../../assets/boss/frostGuardian.png";
import deathWorm from "../../assets/boss/deathWorm.png";

export class EnemyAssets {
  constructor() {}

  getAssets = async (): Promise<Record<EnemyId | BossId, HTMLImageElement>> => {
    return {
      // Enemy
      skeletonShield: await loadImage(skeletonShield),
      mushroom: await loadImage(mushroom),
      goblin: await loadImage(goblin),
      skeletonGuard: await loadImage(skeletonGuard),
      skeletonGuardSpawn: await loadImage(skeletonGuardSpawn),
      chainedGolem: await loadImage(chainedGolem),
      terrorWolf: await loadImage(terrorWolf),
      bloodyBat: await loadImage(bloodyBat),
      evilWitch: await loadImage(evilWitch),
      fireWorm: await loadImage(fireWorm),
      skeletonArcher: await loadImage(skeletonArcher),
      skeletonWarrior: await loadImage(skeletonWarrior),
      necromancer: await loadImage(necromancer),
      skeletonCat: await loadImage(skeletonCat),

      // Boss
      demon: await loadImage(demon),
      frostGuardian: await loadImage(frostGuardian),
      deathWorm: await loadImage(deathWorm),
    };
  };
}
