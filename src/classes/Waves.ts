import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";
import { Mushroom } from "./enemies/Mushroom";
import { Goblin } from "./enemies/Goblin";
import { FireWorm } from "./enemies/FireWorm";
import { Demon } from "./bosses/Demon";
import { SkeletonWarrior } from "./enemies/SkeletonWarrior";

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
    {
      id: SkeletonWarrior.config.id,
      className: SkeletonWarrior,
      config: SkeletonWarrior.config,
      unitCount: 22,
    },
  ] as const;

  static readonly startingPosition = { x: -30, y: 160 };

  constructor() {}

  createEnemyWave = () => {
    if (this.waveIndex >= Waves.waves.length) {
      throw new Error("No more waves available");
    }
    const { className, unitCount, config } = Waves.waves[this.waveIndex];

    const currentEnemies = [];

    const enemyDistance = 60;

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.startingPosition;

      const currentStartingPosition = x - i * enemyDistance;

      currentEnemies.push(
        new className(shortUUID.generate(), currentStartingPosition, y)
      );
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
