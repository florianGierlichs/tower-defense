import { Demon } from "../classes/bosses/Demon";
import { FireWorm } from "../classes/enemies/FireWorm";
import { Goblin } from "../classes/enemies/Goblin";
import { Mushroom } from "../classes/enemies/Mushroom";
import { SkeletonShield } from "../classes/enemies/SkeletonShield";
import { Flame } from "../classes/projectiles/Flame";
import { LightningBolt } from "../classes/projectiles/LightningBolt";
import { Projectile } from "../classes/projectiles/Projectile";
import { FireMage } from "../classes/towers/FireMage";
import { LightningMage } from "../classes/towers/LightningMage";
import { ArcaneArcher } from "../classes/towers/ArcaneArcher";
import { SkeletonGuard } from "../classes/enemies/SkeletonGuard";
import { ChainedGolem } from "../classes/enemies/ChainedGolem";
import { TerrorWolf } from "../classes/enemies/TerrorWolf";
import { BloodyBat } from "../classes/enemies/BloodyBat";
import { EvilWitch } from "../classes/enemies/EvilWitch";
import { SkeletonArcher } from "../classes/enemies/SkeletonArcher";
import { FrostGuardian } from "../classes/bosses/FrostGuardian";
import { Necromancer } from "../classes/enemies/Necromancer";
import { SkeletonCat } from "../classes/enemies/SkeletonCat";
import { SkeletonWarrior } from "../classes/enemies/SkeletonWarrior";
import { DeathWorm } from "../classes/bosses/DeathWorm";
import { DemonMage } from "../classes/towers/DemonMage";
import { Fireball } from "../classes/projectiles/Fireball";

export interface Coordinate {
  x: number;
  y: number;
}

export interface FrameConfig {
  frames: number;
  animationIterationCircleTime: number;
  flipOffsetFrames: number;
  animationStartRight: {
    sx: number;
    sy: number;
  };
  animationStartLeft: {
    sx: number;
    sy: number;
  };
}

export interface FrameConfigs {
  [key: string]: FrameConfig;
}

export interface EnemyConfig {
  id: EnemyId | BossId;
  name: string;
  health: number;
  speed: number;
  maxSlowPercentage: number;
  special?: EnemySpecial;
  sWidth: number;
  sHeight: number;
  imageScale: number;
  imageTranslateCorrection: {
    x: number;
    y: number;
  };
  frameConfig: FrameConfigs;
  bountyGold: number;
}

export interface EnemySpecial {
  description: string;
  value?: number;
}

export interface TowerConfig {
  id: TowerId;
  name: string;
  description: string;
  range: number;
  attackSpeed: number;
  damage: number;
  sWidth: number;
  sHeight: number;
  imageScale: number;
  imageTranslateCorrection: {
    x: number;
    y: number;
  };
  frameConfig: FrameConfigs;
  cancelAttackAnimantionAllowed: boolean;
  projectile: {
    id: ProjectileId;
    width: number;
    height: number;
  };
  bluePrint: {
    id: BlueprintId;
  };
}

export enum EnemyState {
  IDLE = "idle",
  MOVE = "move",
}

export enum TowerState {
  IDLE = "idle",
  ATTACK = "attack",
  STUNNED = "stunned",
}

export enum AnimationDirection {
  LEFT = "left",
  RIGHT = "right",
}

export interface MenuTower {
  readonly id: TowerId;
  readonly config: TowerConfig;
  readonly price: number;
}

export enum TowerId {
  ARCANE_ARCHER = "arcaneArcher",
  FIRE_MAGE = "fireMage",
  Lightning_MAGE = "lightningMage",
  DEMON_MAGE = "demonMage",
}

export enum ProjectileId { // todo id does not match projectile class name, dont know if this is a problem
  ARCANE_ARCHER = "arcaneArcherProjectile",
  FIRE_MAGE = "fireMageProjectile",
  LIGHTNING_MAGE = "lightningMageProjectile",
  DEMON_MAGE = "demonMageProjectile",
}

export enum EnemyProjectileId {
  ICICLE = "icicle",
}

export enum EffectId {
  FREEZE_TOWER = "freezeTower",
  FIRE_EXPLOSION = "fireExplosion",
}

export enum BlueprintId {
  ARCANE_ARCHER = "arcaneArcherBp",
  FIRE_MAGE = "fireMageBp",
  LIGHTNING_MAGE = "lightningMageBp",
  DEMON_MAGE = "demonMageBp",
}

export type ProjectileInstance = Projectile | Flame | LightningBolt | Fireball;

export type TowerInstance = ArcaneArcher | FireMage | LightningMage | DemonMage;

export type EnemyInstance =
  | SkeletonShield
  | Mushroom
  | Goblin
  | FireWorm
  | SkeletonGuard
  | ChainedGolem
  | TerrorWolf
  | BloodyBat
  | EvilWitch
  | Necromancer
  | SkeletonCat
  | SkeletonWarrior
  | SkeletonArcher;

export type BossInstance = Demon | FrostGuardian | DeathWorm;

export type EnemyId =
  | "skeletonShield"
  | "mushroom"
  | "goblin"
  | "fireWorm"
  | "skeletonGuard"
  | "skeletonGuardSpawn"
  | "chainedGolem"
  | "terrorWolf"
  | "bloodyBat"
  | "evilWitch"
  | "skeletonArcher"
  | "skeletonCat"
  | "skeletonWarrior"
  | "necromancer";

export type BossId = "demon" | "frostGuardian" | "deathWorm";

export interface PathNode {
  x: number;
  y: number;
}

export enum ResultType {
  WON,
  LOST,
}

export type Result = ResultType;
