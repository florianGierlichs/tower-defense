import { ResultType } from "../utils/types";
import { Game } from "./Game";
import { EndScreen } from "./gui/EndScreen";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";

export class Round {
  game;
  waveIsScheduled = false;
  initialWave = true;

  constructor(game: Game) {
    this.game = game;
  }

  private spawnEnemies = () => {
    const { currentEnemies, name } = this.game.waves.createEnemyWave();
    const startWave = () => {
      this.game.enemies.setCurrentEnemies(currentEnemies);
      this.waveIsScheduled = false;
    };
    setTimeout(() => {
      new SpawnEnemiesInformation(name, startWave);
    }, 1000);
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
        this.spawnEnemies();
        this.waveIsScheduled = true;
        return;
      }

      this.game.gold.increaseGoldAfterRound();
      // todo prio show gold increase somehow
      this.spawnEnemies();
      this.waveIsScheduled = true;
    }
  };
}
