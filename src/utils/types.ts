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
  name: string;
  health: number;
  speed: number;
  imageScale: number;
  imageConfig: {
    move: FrameConfig;
  };
}
