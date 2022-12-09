import { Tile } from "./Tile";

export type TileRow = Tile[];

export class Tiles {
  columLength = 12;
  rowLength = 20;
  tileWdith = 64;
  tileHeight = this.tileWdith;
  tilesTotal = this.columLength * this.rowLength;

  tileRows: TileRow[] = [];

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
      row.push(new Tile(i, this.getTileX(i), this.getTileY()));
      if (row.length === this.rowLength) {
        this.tileRows.push(row);
        row = [];
      }
    }
  };

  private updateTileGrid = () => {
    this.tileRows.forEach((row) => {
      row.forEach((tile) => {
        tile.update();
      });
    });
  };

  getTileRows = () => {
    return this.tileRows;
  };

  update = () => {
    if (this.tileRows.length !== 0) {
      this.updateTileGrid();
    } else {
      throw new Error("Required");
    }
  };
}
