import { dom, tiles } from "../main";
import { timeHasPassed } from "../utils/timeHasPassed";
import { ResultType } from "../utils/types";
import { Enemies } from "./Enemies";
import { Gold } from "./Gold";
import { EndScreen } from "./gui/EndScreen";
import { Menu } from "./gui/Menu";
import { PlayerHealth } from "./PlayerHealth";
import { Round } from "./Round";
import { Towers } from "./Towers";
import { Waves } from "./Waves";

export class Game {
  private stop = false;
  lastAnimationTimestamp: number | null = null;
  fps = 60;
  intervalInMiliseconds = 1000 / this.fps;

  menu;
  towers;
  enemies;
  waves;
  gold;
  playerHealth;
  round;

  constructor() {
    this.menu = new Menu();
    this.towers = new Towers();
    this.enemies = new Enemies();
    this.waves = new Waves();
    this.gold = new Gold();
    this.playerHealth = new PlayerHealth();
    this.round = new Round(this);

    tiles.createTileGrid();
    tiles.buildTileImg();

    this.runGame();
  }

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

  stopGame = () => {
    this.stop = true;
  };

  private update = () => {
    if (this.playerHealth.getCurrentHealth() <= 0) {
      this.stopGame();
      new EndScreen(ResultType.LOST);
      return;
    }

    dom.ctxGame.clearRect(0, 0, dom.canvasGame.width, dom.canvasGame.height);

    this.enemies.update();
    this.towers.update();
    tiles.update();
    this.round.update();
  };
}
