import { Aoe } from "./Aoe";
import { Slow } from "./Slow";

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
      enemy.addSlow(new Slow(30, 2000));
    });
  };
}
