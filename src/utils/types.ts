import { TowerClasses, TowerName } from "../classes/Menu";
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

export interface EnemyConfig {
  name: EnemyName;
  health: number;
  speed: number;
  imageScale: number;
  frameConfig: {
    move: FrameConfig;
  };
}

export enum EnemyState {
  IDLE = "idle",
  MOVE = "move",
}

export enum AnimationDirection {
  LEFT = "left",
  RIGHT = "right",
}

export interface MenuTower {
  readonly id: TowerName;
  readonly className: TowerClasses[number];
  readonly range: number;
}
