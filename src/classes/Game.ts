import { canvasGame } from "../main";
import { getTileForClick } from "../utils/getTileForClick";
import { Enemies } from "./Enemies";
import { Menu } from "./Menu";
import { TileGras } from "./TileGras";
import { Tiles } from "./Tiles";
import { Towers } from "./Towers";

export interface PathNode {
  x: number;
  y: number;
}

export type TowerNames = typeof TOWERS_NAMES;
export type TowerName = TowerNames[number];

const TOWERS_NAMES = ["arcaneArcher"] as const;

export class Game {
  time: number = 0;

  appContainer = document.querySelector<HTMLDivElement>("#app")!;

  towerNames = TOWERS_NAMES;

  tiles = new Tiles();
  menu = new Menu(this.towerNames, this.appContainer); // todo try to not pass the element
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
  }

  getAppContainer = () => this.appContainer;

  placeTowerOnTile = (event: MouseEvent, tower: TowerName) => {
    const tile = getTileForClick(this.tiles.getTileRows(), event);
    console.log("tile", tile);

    this.towers.hideTowerRanger();
    if (tile instanceof TileGras && tile.hasTower) {
      const tower = this.towers.getTowerForTile(tile.x, tile.y);
      tower?.setShowRange(true);
      // todo show range needs to be in other method
    }

    if (tile instanceof TileGras && !tile.hasTower) {
      this.towers.createTower(tile.x, tile.y, tower);
      tile.setHasTower();
    }
  };

  addPlaceTowerOnTileClickEventForCanvasGame = (tower: TowerName) => {
    const listener = (e: MouseEvent) => {
      this.placeTowerOnTile(e, tower);
      canvasGame.removeEventListener("click", listener);
    };
    canvasGame.addEventListener("click", listener);
  };
}
