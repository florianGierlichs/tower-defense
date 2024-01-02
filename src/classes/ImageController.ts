import { loadImage } from "../utils/loadImage";
import {
  BlueprintId,
  BossId,
  EffectId,
  EnemyId,
  EnemyProjectileId,
  ProjectileId,
  TowerId,
} from "../utils/types";
import arcaneArcherImg from "../assets/tower/arcaneArcher.png";
import arcaneArcherProjectileImg from "../assets/projectiles/arcaneArcherProjectile.png";
import arcaneArcherBpImg from "../assets/towerBlueprint/arcaneArcherBp.png";
import texturesImg from "../assets/textures.png";
import fireMageImg from "../assets/tower/fireMage.png";
import fireMageProjectileImg from "../assets/projectiles/fireMageProjectile.png";
import fireMageBpImg from "../assets/towerBlueprint/fireMageBp.png";
import lightningMageImg from "../assets/tower/lightningMage.png";
import lightningMageProjectileImg from "../assets/projectiles/lightningMageProjectile.png";
import lightningMageBpImg from "../assets/towerBlueprint/lightningMageBp.png";
import demonMageImg from "../assets/tower/demonMage.png";
import demonMageProjectileImg from "../assets/projectiles/demonMageProjectile.png";
import demonMageBpImg from "../assets/towerBlueprint/demonMageBp.png";
import obeliskImg from "../assets/tower/obelisk.png";
import obeliskBpImg from "../assets/towerBlueprint/obeliskBp.png";
import { EnemyAssets } from "./enemies/EnemyAssets";
import icicleImg from "../assets/projectiles/icicle.png";
import freezeTowerImg from "../assets/effect/freezeTower.png";
import fireExplosionImg from "../assets/effect/fireExplosion.png";
import electrifiedImg from "../assets/effect/electrified.png";

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

  lightningMage: HTMLImageElement | null = null;
  lightningMageProjectile: HTMLImageElement | null = null;
  lightningMageBp: HTMLImageElement | null = null;

  demonMage: HTMLImageElement | null = null;
  demonMageProjectile: HTMLImageElement | null = null;
  demonMageBp: HTMLImageElement | null = null;

  obelisk: HTMLImageElement | null = null;
  obeliskBp: HTMLImageElement | null = null;

  // enemy
  enemyAssets: Record<EnemyId | BossId, HTMLImageElement> | null = null;

  // enemy projectiles
  icicle: HTMLImageElement | null = null;

  // effects
  freezeTower: HTMLImageElement | null = null;
  fireExplosion: HTMLImageElement | null = null;
  electrified: HTMLImageElement | null = null;

  loadImages = async () => {
    this.textures = await loadImage(texturesImg);

    // tower
    this.arcaneArcher = await loadImage(arcaneArcherImg);
    this.arcaneArcherProjectile = await loadImage(arcaneArcherProjectileImg);
    this.arcaneArcherBp = await loadImage(arcaneArcherBpImg);

    this.fireMage = await loadImage(fireMageImg);
    this.fireMageProjectile = await loadImage(fireMageProjectileImg);
    this.fireMageBp = await loadImage(fireMageBpImg);

    this.lightningMage = await loadImage(lightningMageImg);
    this.lightningMageProjectile = await loadImage(lightningMageProjectileImg);
    this.lightningMageBp = await loadImage(lightningMageBpImg);

    this.demonMage = await loadImage(demonMageImg);
    this.demonMageProjectile = await loadImage(demonMageProjectileImg);
    this.demonMageBp = await loadImage(demonMageBpImg);

    this.obelisk = await loadImage(obeliskImg);
    this.obeliskBp = await loadImage(obeliskBpImg);

    // enemy
    this.enemyAssets = await new EnemyAssets().getAssets();

    // enemy projectiles
    this.icicle = await loadImage(icicleImg);

    // effects
    this.freezeTower = await loadImage(freezeTowerImg);
    this.fireExplosion = await loadImage(fireExplosionImg);
    this.electrified = await loadImage(electrifiedImg);
  };

  getImage = (
    key:
      | typeof texturesKey
      | TowerId
      | ProjectileId
      | BlueprintId
      | EnemyProjectileId
      | EffectId
  ): HTMLImageElement => {
    const image = this[key];
    if (image === null) {
      throw new Error("Images not loaded yet");
    }

    return image;
  };

  getEnemyImage = (id: EnemyId | BossId) => {
    if (this.enemyAssets === null) {
      throw new Error("Enemy assets not loaded yet");
    }
    const image = this.enemyAssets[id];
    return image;
  };
}
