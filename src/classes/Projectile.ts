export class Projectile {
  x: number;
  y: number;
  destinationX: number;
  destinationY: number;
  width: number = 4;
  color: string = "red";
  speed: number = 2;
  hasCollided: boolean = false;

  constructor(
    x: number,
    y: number,
    destinationX: number,
    destinationY: number
  ) {
    this.x = x;
    this.y = y;
    this.destinationX = destinationX;
    this.destinationY = destinationY;
  }

  //draw()
}
