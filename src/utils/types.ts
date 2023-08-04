import { EnemyName } from "../classes/Waves";

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
  name: EnemyName;
  health: number;
  speed: number;
  imageScale: number;
  frameConfig: FrameConfigs;
}

export interface TowerConfig {
  id: TowerId;
  range: number;
  attackSpeed: number;
  imageScale: number;
  frameConfig: FrameConfigs;
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
  readonly range: number;
  readonly blueprintId: BlueprintId;
}

export enum TowerId {
  ARCANE_ARCHER = "arcaneArcher",
  FIRE_MAGE = "fireMage",
}

export enum ProjectileId {
  ARCANE_ARCHER = "arcaneArcherProjectile",
  FIRE_MAGE = "fireMageProjectile",
}

export enum BlueprintId {
  ARCANE_ARCHER = "arcaneArcherBp",
  FIRE_MAGE = "fireMageBp",
}
