import shortUUID from "short-uuid";
import { SkeletonShield } from "./enemies/SkeletonShield";
import { Mushroom } from "./enemies/Mushroom";
import { Goblin } from "./enemies/Goblin";
import { FireWorm } from "./enemies/FireWorm";
import { Demon } from "./bosses/Demon";
import { SkeletonGuard } from "./enemies/SkeletonGuard";
import { ChainedGolem } from "./enemies/ChainedGolem";
import { TerrorWolf } from "./enemies/TerrorWolf";
import { BloodyBat } from "./enemies/BloodyBat";
import { EvilWitch } from "./enemies/EvilWitch";
import { SkeletonArcher } from "./enemies/SkeletonArcher";
import { FrostGuardian } from "./bosses/FrostGuardian";
import { SkeletonCat } from "./enemies/SkeletonCat";
import { SkeletonWarrior } from "./enemies/SkeletonWarrior";
import { Necromancer } from "./enemies/Necromancer";
import { DeathWorm } from "./bosses/DeathWorm";

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
      id: DeathWorm.config.id,
      className: DeathWorm,
      config: DeathWorm.config,
      unitCount: 1,
    },
    {
      id: SkeletonGuard.config.id,
      className: SkeletonGuard,
      config: SkeletonGuard.config,
      unitCount: 22,
    },
    {
      id: ChainedGolem.config.id,
      className: ChainedGolem,
      config: ChainedGolem.config,
      unitCount: 12,
    },
    {
      id: TerrorWolf.config.id,
      className: TerrorWolf,
      config: TerrorWolf.config,
      unitCount: 20,
    },
    {
      id: BloodyBat.config.id,
      className: BloodyBat,
      config: BloodyBat.config,
      unitCount: 20,
    },
    {
      id: FrostGuardian.config.id,
      className: FrostGuardian,
      config: FrostGuardian.config,
      unitCount: 1,
    },
    {
      id: EvilWitch.config.id,
      className: EvilWitch,
      config: EvilWitch.config,
      unitCount: 20,
    },
    {
      id: SkeletonArcher.config.id,
      className: SkeletonArcher,
      config: SkeletonArcher.config,
      unitCount: 20,
    },
    {
      id: SkeletonCat.config.id,
      className: SkeletonCat,
      config: SkeletonCat.config,
      unitCount: 20,
    },
    {
      id: SkeletonWarrior.config.id,
      className: SkeletonWarrior,
      config: SkeletonWarrior.config,
      unitCount: 20,
    },
    {
      id: Necromancer.config.id,
      className: Necromancer,
      config: Necromancer.config,
      unitCount: 20,
    },
    {
      id: Demon.config.id,
      className: Demon,
      config: Demon.config,
      unitCount: 1,
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
