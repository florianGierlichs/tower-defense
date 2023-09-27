import { ResultType } from "../utils/types";
import { Game } from "./Game";
import { EndScreen } from "./gui/EndScreen";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";
import { ModalPopIn } from "./gui/ModalPopIn";

export class Round {
  game;
  waveIsScheduled = false;

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
    const modalContent = new SpawnEnemiesInformation(
      name,
      bountyGold
    ).getContainer();
    new ModalPopIn(5000, modalContent, startWave);
  };

  update = () => {
    if (!this.waveIsScheduled && this.game.enemies.allEnemiesRemoved) {
      // defeated current wave or initial wave

      if (this.game.waves.wasLastWave) {
        this.game.stopGame();
        new EndScreen(ResultType.WON);
        return;
      }

      if (this.game.waves.waveIndex > 0) {
        // after initial wave
        this.game.gold.increaseGoldAfterRound();
      }

      setTimeout(() => {
        this.spawnEnemies();
      }, 300);
      this.waveIsScheduled = true;
    }
  };
}
