import { TileGras } from "./TileGras";
import { TilePath } from "./TilePath";

export type TileRow = (TileGras | TilePath)[];

interface PathTile {
  id: number;
  direction: "horizontal" | "vertical" | "corner";
}

export class Tiles {
  columLength = 12;
  rowLength = 20;
  tileWdith = 64;
  tileHeight = this.tileWdith;
  tilesTotal = this.columLength * this.rowLength;

  pathConfiguration: PathTile[] = [
    { id: 60, direction: "horizontal" },
    { id: 61, direction: "horizontal" },
    { id: 62, direction: "horizontal" },
    { id: 63, direction: "corner" },
    { id: 83, direction: "vertical" },
    { id: 103, direction: "vertical" },
    { id: 123, direction: "vertical" },
    { id: 143, direction: "vertical" },
    { id: 163, direction: "corner" },
    { id: 164, direction: "horizontal" },
    { id: 165, direction: "horizontal" },
    { id: 166, direction: "horizontal" },
    { id: 167, direction: "corner" },
    { id: 147, direction: "vertical" },
    { id: 127, direction: "vertical" },
    { id: 107, direction: "corner" },
    { id: 108, direction: "horizontal" },
    { id: 109, direction: "horizontal" },
    { id: 110, direction: "corner" },
    { id: 130, direction: "vertical" },
    { id: 150, direction: "vertical" },
    { id: 170, direction: "vertical" },
    { id: 190, direction: "vertical" },
    { id: 210, direction: "corner" },
    { id: 211, direction: "horizontal" },
    { id: 212, direction: "horizontal" },
    { id: 213, direction: "horizontal" },
    { id: 214, direction: "horizontal" },
    { id: 215, direction: "horizontal" },
    { id: 216, direction: "corner" },
    { id: 196, direction: "vertical" },
    { id: 176, direction: "vertical" },
    { id: 156, direction: "corner" },
    { id: 155, direction: "horizontal" },
    { id: 154, direction: "corner" },
    { id: 134, direction: "vertical" },
    { id: 114, direction: "vertical" },
    { id: 94, direction: "vertical" },
    { id: 74, direction: "vertical" },
    { id: 54, direction: "vertical" },
    { id: 34, direction: "vertical" },
    { id: 14, direction: "vertical" },
  ];

  tileRows: TileRow[] = [];
  tilePaths: TilePath[] = [];

  constructor() {}

  private getTileX = (index: number) => {
    return (index % this.rowLength) * this.tileWdith + (index % this.rowLength);
  };

  private getTileY = () => {
    return (
      this.tileRows.length * this.tileWdith +
      (this.tileRows.length % this.rowLength)
    );
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
}
