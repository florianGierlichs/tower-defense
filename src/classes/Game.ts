import { dom, game, tiles } from "../main";
import { DomBody } from "./DomBody";
import { Enemies } from "./Enemies";
import { Menu } from "./Menu";
import { Towers } from "./Towers";
import { Waves } from "./Waves";

export class Game {
  time: number = 0;

  menu = new Menu();
  towers = new Towers();
  enemies: Enemies;
  waves = new Waves();
  dom = new DomBody(); // todo maybe put to DomController if DomController can be put to Game

  constructor() {
    tiles.createTileGrid();
    tiles.buildTileImg();

    this.enemies = new Enemies();

    this.spawnEnemies();

    // todo add logic for scheduling waves
    setTimeout(() => {
      this.spawnEnemies();
    }, 25000);

    setTimeout(() => {
      this.spawnEnemies();
    }, 50000);

    dom.toggleTilesInfoButton.addEventListener("click", tiles.toggleDebug); // todo put this to own class
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
    game.menu.setSelectedTower(null);
    this.dom.removeAllClassesFromBody();
  };
}
