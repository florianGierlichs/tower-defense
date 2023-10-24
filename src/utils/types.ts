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
import { SkeletonWarrior } from "../classes/enemies/SkeletonWarrior";
import { ChainedGolem } from "../classes/enemies/ChainedGolem";
import { TerrorWolf } from "../classes/enemies/TerrorWolf";
import { BloodyBat } from "../classes/enemies/BloodyBat";

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
}

export enum ProjectileId { // todo id does not match projectile class name, dont know if this is a problem
  ARCANE_ARCHER = "arcaneArcherProjectile",
  FIRE_MAGE = "fireMageProjectile",
  LIGHTNING_MAGE = "lightningMageProjectile",
}

export enum BlueprintId {
  ARCANE_ARCHER = "arcaneArcherBp",
  FIRE_MAGE = "fireMageBp",
  LIGHTNING_MAGE = "lightningMageBp",
}

export type ProjectileInstance = Projectile | Flame | LightningBolt;

export type TowerInstance = ArcaneArcher | FireMage | LightningMage;

export type EnemyInstance =
  | SkeletonShield
  | Mushroom
  | Goblin
  | FireWorm
  | SkeletonWarrior
  | ChainedGolem
  | TerrorWolf
  | BloodyBat;

export type BossInstance = Demon;

export type EnemyId =
  | "skeletonShield"
  | "mushroom"
  | "goblin"
  | "fireWorm"
  | "skeletonWarrior"
  | "chainedGolem"
  | "terrorWolf"
  | "bloodyBat";

export type BossId = "demon";

export interface PathNode {
  x: number;
  y: number;
}

export enum ResultType {
  WON,
  LOST,
}

export type Result = ResultType;
