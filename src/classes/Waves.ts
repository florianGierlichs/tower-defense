import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";
import { Mushroom } from "./enemies/Mushroom";
import { Goblin } from "./enemies/Goblin";

export class Waves {
  waveIndex = 0;

  static readonly waves = [
    {
      id: "skeletonShield",
      name: "Shielded Skeleton",
      className: SkeletonShield,
      unitCount: 9,
    },
    {
      id: "mushroom",
      name: "Mad Mushroom",
      className: Mushroom,
      unitCount: 12,
    },
    { id: "goblin", name: "Greedy Goblin", className: Goblin, unitCount: 6 },
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
    if (this.waveIndex >= Waves.waves.length) {
      throw new Error("No more waves available");
    }
    const { className, unitCount, name } = Waves.waves[this.waveIndex];

    const currentEnemies = [];

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.waveStartingPositions[i];
      currentEnemies.push(new className(shortUUID.generate(), x, y));
    }
    this.waveIndex++;

    return { currentEnemies, name };
  };
}

const waveIds = Waves.waves.map((obj) => obj.id);
export type EnemyId = (typeof waveIds)[number];

const waveNames = Waves.waves.map((obj) => obj.name);
export type EnemyNames = (typeof waveNames)[number];
