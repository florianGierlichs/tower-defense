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
      name: "Shielded Skeleton",
      className: SkeletonShield,
      unitCount: 12,
      bountyGold: SkeletonShield.config.bountyGold,
    },
    {
      id: Mushroom.config.id,
      name: "Mad Mushroom",
      className: Mushroom,
      unitCount: 12,
      bountyGold: Mushroom.config.bountyGold,
    },
    {
      id: Goblin.config.id,
      name: "Greedy Goblin",
      className: Goblin,
      unitCount: 12,
      bountyGold: Goblin.config.bountyGold,
    },
    {
      id: FireWorm.config.id,
      name: "Fire Worm",
      className: FireWorm,
      unitCount: 12,
      bountyGold: FireWorm.config.bountyGold,
    },
    {
      id: Demon.config.id,
      name: "Demon",
      className: Demon,
      unitCount: 1,
      bountyGold: Demon.config.bountyGold,
    },
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
    const { className, unitCount, name, bountyGold } =
      Waves.waves[this.waveIndex];

    const currentEnemies = [];

    for (let i = 0; i < unitCount; i++) {
      const { x, y } = Waves.waveStartingPositions[i];
      currentEnemies.push(new className(shortUUID.generate(), x, y));
    }
    this.waveIndex++;

    if (this.waveIndex >= Waves.waves.length) {
      this.wasLastWave = true;
    }

    return { currentEnemies, name, bountyGold };
  };
}

const waveNames = Waves.waves.map((obj) => obj.name);
export type EnemyNames = (typeof waveNames)[number];
