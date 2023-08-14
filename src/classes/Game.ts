import { dom, game, tiles } from "../main";
import { getTileForHover } from "../utils/getTileForHover";
import { Enemies } from "./Enemies";
import { Menu } from "./Menu";
import { Towers } from "./Towers";
import { Waves } from "./Waves";
import { TileGras } from "./tiles/TileGras";

export interface PathNode {
  // TODO put to util/types
  x: number;
  y: number;
}

export class Game {
  time: number = 0;

  menu = new Menu();
  towers = new Towers();
  enemies: Enemies;
  waves = new Waves();

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

    dom.body.addEventListener("contextmenu", this.contextmenuCallback);
    dom.body.addEventListener("click", this.clickCallback, true);
    dom.body.addEventListener("mousemove", this.mouseMoveCallback);

    dom.toggleTilesInfoButton.addEventListener("click", tiles.toggleDebug); // todo put this to own class
  }

  private spawnEnemies = () => {
    const currentEnemies = this.waves.createEnemyWave();
    this.enemies.setCurrentEnemies(currentEnemies);
  };

  private contextmenuCallback = (event: MouseEvent) => {
    event.preventDefault();
    this.resetEventListeners();
  };

  private clickCallback = (_event: MouseEvent) => {
    this.towers.hideTowerRange();
  };

  private mouseMoveCallback = (event: MouseEvent) => {
    this.showTowerMouseCursor(event);
  };

  private showTowerMouseCursor = (event: MouseEvent) => {
    const selectedTower = game.menu.getSelectedTower();
    const tile = getTileForHover(event);
    if (selectedTower !== null) {
      if (
        (tile instanceof TileGras && tile.showTowerBP === null) ||
        tile === null
      ) {
        dom.addTowerMouseCursor(selectedTower);
      }
    }
  };

  resetEventListeners = () => {
    tiles.tileGras.forEach((tile) => {
      tile.setShowTowerBp(null);
      tile.updateBG();
    });
    this.towers.hideTowerRange();
    game.menu.setSelectedTower(null);
    dom.removeAllClassesFromAppContainer();
  };
}
