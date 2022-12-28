export class Tile {
  id;
  x;
  y;
  width: number = 64;
  height: number = 64;

  constructor(id: number, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}
