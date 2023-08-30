import { Aoe } from "./Aoe";

export class AoeSlow extends Aoe {
  constructor(
    id: string,
    x: number,
    y: number,
    radius: number,
    damage: number
  ) {
    super(id, x, y, radius, damage);

    this.slowEnemiesInsideArea();
  }

  private slowEnemiesInsideArea = () => {
    this.getEnemiesInsideArea().forEach((enemy) => {
      //   console.log(enemy);
      //enemy.slow();
    });
  };
}
