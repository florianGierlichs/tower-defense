import { dom, tiles } from "../main";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Enemies } from "./Enemies";
import { Gold } from "./Gold";
import { EndScreen } from "./gui/EndScreen";
import { Menu } from "./gui/Menu";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";
import { Towers } from "./Towers";
import { Waves } from "./Waves";

export class Game {
  stop = false;
  lastAnimationTimestamp: number | null = null;
  fps = 60;
  intervalInMiliseconds = 1000 / this.fps;

  waveIsScheduled = false;

  menu;
  towers;
  enemies;
  waves;
  gold;

  constructor() {
    this.menu = new Menu();
    this.towers = new Towers();
    this.enemies = new Enemies();
    this.waves = new Waves();
    this.gold = new Gold();

    tiles.createTileGrid();
    tiles.buildTileImg();

    // prio todo add player health and game over lost
    // prio todo add logic for gold increase after each wave
    // => + static gold value + % of curent golf
    // prio todo add bounty for killing enemies
    // => gold bounty gets decreased by time need to kill enemy

    this.runGame();
  }

  private spawnEnemies = () => {
    const { currentEnemies, name } = this.waves.createEnemyWave();
    const startWave = () => {
      this.enemies.setCurrentEnemies(currentEnemies);
      this.waveIsScheduled = false;
    };
    setTimeout(() => {
      new SpawnEnemiesInformation(name, startWave);
    }, 1000);
  };

  resetEventListeners = () => {
    tiles.tileGras.forEach((tile) => {
      tile.setShowTowerBp(null);
      tile.updateBG();
    });
    this.towers.hideTowerRange();
    this.menu.setSelectedTower(null);
    dom.body.removeAllClassesFromBody();
  };

  private runGame = (timestamp?: number) => {
    if (this.stop) {
      console.log("end");
      return;
    }

    if (timestamp) {
      if (
        timeHasPassed(this.lastAnimationTimestamp, this.intervalInMiliseconds)
      ) {
        this.lastAnimationTimestamp = timestamp;

        this.update();
      }
    } else {
      // initial run
      this.update();
    }

    requestAnimationFrame(this.runGame);
  };

  private update = () => {
    dom.ctxGame.clearRect(0, 0, dom.canvasGame.width, dom.canvasGame.height);

    this.enemies.update();
    this.towers.update();
    tiles.update();

    if (!this.waveIsScheduled && this.enemies.allEnemiesRemoved) {
      if (this.waves.wasLastWave) {
        this.stop = true;
        new EndScreen();
        return;
      }
      this.spawnEnemies();
      this.waveIsScheduled = true;
    }
  };
}
