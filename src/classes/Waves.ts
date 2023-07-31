import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";

export class Waves {
  waveIndex = 0;

  static readonly waves = [
    { id: "skeletonShield", className: SkeletonShield, unitCount: 9 },
  ] as const;

  static readonly waveStartingPositions = [
    // TODO find dynamic way to get starting positions
    // maybe use unitCount and individual "distance" (would be new) property to define x coordinate
    { x: 40, y: 160 },
    { x: 0, y: 160 },
    { x: -40, y: 160 },
    { x: -80, y: 160 },
    { x: -120, y: 160 },
    { x: -160, y: 160 },
    { x: -200, y: 160 },
    { x: -240, y: 160 },
    { x: -280, y: 160 },
  ] as const;

  constructor() {}

  spawnWave = () => {
    const { className, unitCount } = Waves.waves[this.waveIndex];

    const current = [];

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.waveStartingPositions[i];
      current.push(new className(shortUUID.generate(), x, y));
    }

    return current;
  };
}

const waveIds = Waves.waves.map((obj) => obj.id);
export type EnemyNames = (typeof waveIds)[number];

export type EnemyClasses = ReturnType<Waves["spawnWave"]>;
