import { dom, tiles } from "../main";
import { getTileForClick } from "../utils/getTileForClick";
import { Enemies } from "./Enemies";
import { Menu } from "./Menu";
import { TileGras } from "./TileGras";
import { Towers } from "./Towers";
import { Waves } from "./Waves";

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

    const currentEnemies = this.waves.spawnWave();
    this.enemies.setCurrentEnemies(currentEnemies);

    this.addShowTowerRangeClickEventForCanvasGame();
    this.addHideTowerRangeClickEventForBody();

    dom.toggleTilesInfoButton.addEventListener("click", tiles.toggleDebug); // todo put this in DomEvents
  }

  private showTowerRange = (event: MouseEvent) => {
    const tile = getTileForClick(event);
    if (tile instanceof TileGras && tile.hasTower) {
      const tower = this.towers.getTowerForTile(tile.x, tile.y);
      tower?.setShowRange(true);
    }
  };

  private hideTowerRange = () => {
    this.towers.hideTowerRange();
  };

  private addShowTowerRangeClickEventForCanvasGame = () => {
    // todo put this in its own event
    const showRangeListener = (e: MouseEvent) => {
      this.showTowerRange(e);
    };
    dom.canvasGame.addEventListener("click", showRangeListener, false); // todo put this in DomEvents
  };

  private addHideTowerRangeClickEventForBody = () => {
    const hideRangeListener = () => {
      this.hideTowerRange();
    };
    dom.body.addEventListener("click", hideRangeListener, true); // todo put this in DomEvents
  };
}
