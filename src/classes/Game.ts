import { dom, tiles } from "../main";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Enemies } from "./Enemies";
import { Gold } from "./Gold";
import { Menu } from "./gui/Menu";
import { SpawnEnemiesInformation } from "./gui/SpawnEnemiesInformation";
import { Towers } from "./Towers";
import { Waves } from "./Waves";

export class Game {
  time: number = 0;
  lastAnimationTimestamp: number | null = null;
  fps = 60;
  intervalInMiliseconds = 1000 / this.fps;

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

    setTimeout(() => {
      this.spawnEnemies();
    }, 500);

    // prio todo add logic for scheduling waves
    // prio todo add logic for gold increase after each wave
    // => + static gold value + % of curent golf
    // prio todo add bounty for killing enemies
    // => gold bounty gets decreased by time need to kill enemy

    setTimeout(() => {
      this.spawnEnemies();
    }, 25000);

    setTimeout(() => {
      this.spawnEnemies();
    }, 50000);

    this.runGame();
  }

  private spawnEnemies = () => {
    const { currentEnemies, name } = this.waves.createEnemyWave();
    const startWave = () => {
      this.enemies.setCurrentEnemies(currentEnemies);
    };

    new SpawnEnemiesInformation(name, startWave);
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
    if (this.time === 10000) {
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

    this.time++;
    requestAnimationFrame(this.runGame);
  };

  private update = () => {
    dom.ctxGame.clearRect(0, 0, dom.canvasGame.width, dom.canvasGame.height);

    this.enemies.update();
    this.towers.update();
    tiles.update();
  };
}
