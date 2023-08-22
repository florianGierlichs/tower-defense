import { ResultType } from "../utils/types";
import { Game } from "./Game";
import { EndScreen } from "./gui/EndScreen";
import { WaveDefeatedScreen } from "./gui/WaveDefeatedScreen";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";

export class Round {
  game;
  waveIsScheduled = false;
  initialWave = true;

  constructor(game: Game) {
    this.game = game;
  }

  private spawnEnemies = () => {
    const { currentEnemies, name, bountyGold } =
      this.game.waves.createEnemyWave();
    const startWave = () => {
      this.game.enemies.setCurrentEnemies(currentEnemies);
      this.waveIsScheduled = false;
      this.game.gold.resetDynamicGoldIncreasePerRound();
    };
    new SpawnEnemiesInformation(name, bountyGold, startWave);
  };

  update = () => {
    if (!this.waveIsScheduled && this.game.enemies.allEnemiesRemoved) {
      // defeated current wave

      if (this.game.waves.wasLastWave) {
        this.game.stopGame();
        new EndScreen(ResultType.WON);
        return;
      }

      if (this.initialWave) {
        this.initialWave = false;
        setTimeout(() => {
          this.spawnEnemies();
        }, 1000);
        this.waveIsScheduled = true;
        return;
      }

      this.game.gold.increaseGoldAfterRound();
      new WaveDefeatedScreen(this.game);
      setTimeout(() => {
        this.spawnEnemies();
      }, 6000);
      this.waveIsScheduled = true;
    }
  };
}
