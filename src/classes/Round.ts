import { ResultType } from "../utils/types";
import { Game } from "./Game";
import { EndScreen } from "./gui/EndScreen";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";
import { ModalPopIn } from "./gui/ModalPopIn";
import { Countdown } from "./gui/Countdown";
import { Toast } from "./gui/Toast";

const isProd = import.meta.env.PROD;
export class Round {
  game;
  waveIsScheduled = false;
  modalLifeTime = isProd ? 10000 : 1000;

  constructor(game: Game) {
    this.game = game;
  }

  private spawnEnemies = () => {
    const { currentEnemies, config } = this.game.waves.createEnemyWave();
    const startWave = () => {
      this.game.enemies.setCurrentEnemies(currentEnemies);
      this.waveIsScheduled = false;
      this.game.gold.resetDynamicGoldIncreasePerRound();
    };
    const spawnEnemyInfo = new SpawnEnemiesInformation(config).getContainer();
    const countdown = new Countdown(this.modalLifeTime / 1000);
    spawnEnemyInfo.appendChild(countdown.getContainer());

    const handleManualClose = () => {
      const toast = new Toast({ children: countdown.getContainer() });
      const interval = setInterval(() => {
        if (countdown.getCountdownTime() === 0) {
          toast.close();
          startWave();
          clearInterval(interval);
        }
      }, 100);
    };

    new ModalPopIn({
      children: spawnEnemyInfo,
      onTimeout: startWave,
      onClose: handleManualClose,
      lifeTime: this.modalLifeTime,
    });
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
