import {
  TowerBpName,
  TowerClasses,
  TowerName,
  TowerProjectileName,
} from "../classes/Menu";
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
  name: TowerName;
  range: number;
  attackSpeed: number;
  imageScale: number;
  frameConfig: FrameConfigs;
  projectile: {
    name: TowerProjectileName;
    width: number;
    height: number;
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
  readonly id: TowerName;
  readonly className: TowerClasses[number];
  readonly range: number;
  readonly projectileId: TowerProjectileName;
  readonly blueprintId: TowerBpName;
}
