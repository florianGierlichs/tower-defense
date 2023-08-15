import { dom, tiles } from "../main";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Enemies } from "./Enemies";
import { Menu } from "./gui/Menu";
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

  constructor() {
    this.menu = new Menu();
    this.towers = new Towers();
    this.enemies = new Enemies();
    this.waves = new Waves();

    tiles.createTileGrid();
    tiles.buildTileImg();

    this.spawnEnemies();

    // todo add logic for scheduling waves
    setTimeout(() => {
      this.spawnEnemies();
    }, 25000);

    setTimeout(() => {
      this.spawnEnemies();
    }, 50000);

    this.runGame();
  }

  private spawnEnemies = () => {
    const currentEnemies = this.waves.createEnemyWave();
    this.enemies.setCurrentEnemies(currentEnemies);
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
