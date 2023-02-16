import { PathNode } from "./Game";
import { TileGras } from "./TileGras";
import { TilePath } from "./TilePath";

export type TileRow = (TileGras | TilePath)[];

interface PathTile {
  id: number;
  direction: "horizontal" | "vertical" | "corner";
}

export class Tiles {
  columLength = 8;
  rowLength = 16;
  tileWdith = 64;
  tileHeight = this.tileWdith;
  tilesTotal = this.columLength * this.rowLength;

  pathConfiguration: PathTile[] = [
    { id: 32, direction: "horizontal" },
    { id: 33, direction: "horizontal" },
    { id: 34, direction: "corner" },
    { id: 50, direction: "vertical" },
    { id: 66, direction: "vertical" },
    { id: 82, direction: "vertical" },
    { id: 98, direction: "corner" },
    { id: 99, direction: "horizontal" },
    { id: 100, direction: "horizontal" },
    { id: 101, direction: "corner" },
    { id: 85, direction: "vertical" },
    { id: 69, direction: "vertical" },
    { id: 53, direction: "vertical" },
    { id: 37, direction: "vertical" },
    { id: 21, direction: "corner" },
    { id: 22, direction: "horizontal" },
    { id: 23, direction: "horizontal" },
    { id: 24, direction: "horizontal" },
    { id: 25, direction: "horizontal" },
    { id: 26, direction: "corner" },
    { id: 42, direction: "vertical" },
    { id: 58, direction: "vertical" },
    { id: 74, direction: "corner" },
    { id: 73, direction: "horizontal" },
    { id: 72, direction: "corner" },
    { id: 88, direction: "vertical" },
    { id: 104, direction: "corner" },
    { id: 105, direction: "horizontal" },
    { id: 106, direction: "horizontal" },
    { id: 107, direction: "horizontal" },
    { id: 108, direction: "horizontal" },
    { id: 109, direction: "corner" },
    { id: 93, direction: "vertical" },
    { id: 77, direction: "vertical" },
    { id: 61, direction: "vertical" },
    { id: 45, direction: "vertical" },
    { id: 29, direction: "vertical" },
    { id: 13, direction: "vertical" },
  ];
  pathEndPoint: PathNode = { x: 864, y: -32 };

  tileRows: TileRow[] = [];
  tilePaths: TilePath[] = [];

  debug = false;

  constructor() {}

  private getTileX = (index: number) => {
    return (index % this.rowLength) * this.tileWdith;
  };

  private getTileY = () => {
    return this.tileRows.length * this.tileWdith;
  };

  createTileGrid = () => {
    for (let i = 0, row = []; i < this.tilesTotal; i++) {
      const pathTile = this.pathConfiguration.find((tile) => tile.id === i);

      if (pathTile !== undefined) {
        const tile = new TilePath(
          i,
          this.getTileX(i),
          this.getTileY(),
          pathTile.direction
        );
        row.push(tile);
        this.tilePaths.push(tile);
      } else {
        row.push(new TileGras(i, this.getTileX(i), this.getTileY()));
      }

      if (row.length === this.rowLength) {
        this.tileRows.push(row);
        row = [];
      }
    }
  };

  buildTileImg = () => {
    this.tileRows.forEach((row) => {
      row.forEach((tile) => {
        tile.update();
      });
    });
  };

  getTileRows = () => {
    return this.tileRows;
  };

  getTilePaths = () => {
    return this.tilePaths;
  };

  getPathConfiguration = () => {
    return this.pathConfiguration;
  };

  getPathEndPoint = () => {
    return this.pathEndPoint;
  };

  toggleDebug = () => {
    if (!this.debug) {
      this.tileRows.forEach((row) => {
        row.forEach((tile) => {
          tile.drawDebug();
        });
      });
    } else {
      this.tileRows.forEach((row) => {
        row.forEach((tile) => {
          tile.update();
        });
      });
    }
    this.debug = !this.debug;
  };
}
