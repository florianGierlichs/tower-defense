import { Enemies } from "./Enemies";
import { Tiles } from "./Tiles";
import { Towers } from "./Towers";

export interface PathNode {
  x: number;
  y: number;
}

export class Game {
  time: number = 0;

  tiles = new Tiles();
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
}
