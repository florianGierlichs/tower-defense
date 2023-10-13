import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";
import { Mushroom } from "./enemies/Mushroom";
import { Goblin } from "./enemies/Goblin";
import { FireWorm } from "./enemies/FireWorm";
import { Demon } from "./bosses/Demon";

export class Waves {
  waveIndex = 0;
  wasLastWave = false;

  static readonly waves = [
    {
      id: SkeletonShield.config.id,
      className: SkeletonShield,
      config: SkeletonShield.config,
      unitCount: 12,
    },
    {
      id: Mushroom.config.id,
      className: Mushroom,
      config: Mushroom.config,
      unitCount: 12,
    },
    {
      id: Goblin.config.id,
      className: Goblin,
      config: Goblin.config,
      unitCount: 12,
    },
    {
      id: FireWorm.config.id,
      className: FireWorm,
      config: FireWorm.config,
      unitCount: 12,
    },
    {
      id: Demon.config.id,
      className: Demon,
      config: Demon.config,
      unitCount: 1,
    },
  ] as const;

  static readonly waveStartingPositions = [
    // TODO find dynamic way to get starting positions
    // maybe use unitCount and individual "distance" (would be new) property to define x coordinate
    { x: 60, y: 160 },
    { x: 0, y: 160 },
    { x: -60, y: 160 },
    { x: -120, y: 160 },
    { x: -180, y: 160 },
    { x: -240, y: 160 },
    { x: -300, y: 160 },
    { x: -360, y: 160 },
    { x: -420, y: 160 },
    { x: -480, y: 160 },
    { x: -540, y: 160 },
    { x: -600, y: 160 },
  ] as const;

  constructor() {}

  createEnemyWave = () => {
    if (this.waveIndex >= Waves.waves.length) {
      throw new Error("No more waves available");
    }
    const { className, unitCount, config } = Waves.waves[this.waveIndex];

    const currentEnemies = [];

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.waveStartingPositions[i];
      currentEnemies.push(new className(shortUUID.generate(), x, y));
    }
    this.waveIndex++;

    if (this.waveIndex >= Waves.waves.length) {
      this.wasLastWave = true;
    }

    return { currentEnemies, config };
  };
}

const waveNames = Waves.waves.map((obj) => obj.config.name);
export type EnemyNames = (typeof waveNames)[number];
