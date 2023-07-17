import { dom } from "../main";
import { getTileForClick } from "../utils/getTileForClick";
import { Enemies } from "./Enemies";
import { DomEvents } from "./DomEvents";
import { Menu } from "./Menu";
import { TileGras } from "./TileGras";
import { Tiles } from "./Tiles";
import { Towers } from "./Towers";

export interface PathNode {
  x: number;
  y: number;
}

export enum TowerType {
  arcaneArcher = "arcaneArcher",
}

const TOWERS_NAMES = Object.values(TowerType);

export type TowerNames = typeof TOWERS_NAMES;

export class Game {
  time: number = 0;

  towerNames = TOWERS_NAMES;

  tiles = new Tiles();
  menu = new Menu(this.towerNames);
  events = new DomEvents();
  towers = new Towers();
  enemies: Enemies;

  constructor() {
    this.tiles.createTileGrid();
    this.tiles.buildTileImg();

    const pathConfigurationCorners = this.tiles
      .getPathConfiguration()
      .filter((tile) => tile.direction === "corner")
      .map((tile) => tile.id);

    const pathNodes = [
      ...this.tiles
        .getTilePaths()
        .filter((tile) => tile.direction === "corner")
        .sort(
          (a, b) =>
            pathConfigurationCorners.indexOf(a.id) -
            pathConfigurationCorners.indexOf(b.id)
        )
        .map((node) => ({
          x: node.x + 32,
          y: node.y + 32,
        })),
      this.tiles.getPathEndPoint(),
    ];

    this.enemies = new Enemies(pathNodes);

    this.addShowTowerRangeClickEventForCanvasGame();
    this.addHideTowerRangeClickEventForBody();

    dom.toggleTilesInfoButton.addEventListener("click", this.tiles.toggleDebug); // todo put this in DomEvents
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
