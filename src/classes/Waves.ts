import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";
import { Mushroom } from "./enemies/Mushroom";
import { Goblin } from "./enemies/Goblin";

export class Waves {
  waveIndex = 0;

  static readonly waves = [
    { id: "skeletonShield", className: SkeletonShield, unitCount: 9 },
    { id: "mushroom", className: Mushroom, unitCount: 12 },
    { id: "goblin", className: Goblin, unitCount: 6 },
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
    { x: -320, y: 160 },
    { x: -360, y: 160 },
    { x: -400, y: 160 },
  ] as const;

  constructor() {}

  createEnemyWave = () => {
    const { className, unitCount } = Waves.waves[this.waveIndex];

    const current = [];

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.waveStartingPositions[i];
      current.push(new className(shortUUID.generate(), x, y));
    }
    this.waveIndex++;

    return current;
  };
}

const waveIds = Waves.waves.map((obj) => obj.id);
export type EnemyName = (typeof waveIds)[number];

export type EnemyClasses = ReturnType<Waves["createEnemyWave"]>;
