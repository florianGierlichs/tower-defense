import { game } from "../../main";
import { isInsideArea } from "../../utils/isInsideArea";
import { Enemy } from "../enemies/Enemy";

export class Aoe {
  // initial values
  id;
  x;
  y;
  radius;
  damage;

  enemies: Enemy[] = [];

  constructor(
    id: string,
    x: number,
    y: number,
    radius: number,
    damage: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.damage = damage;

    this.setEnemiesInsideArea();

    this.damageEnemiesInsideArea();
  }

  private setEnemiesInsideArea = () => {
    this.enemies = game.enemies.getCurrentEnemies().filter((enemy) =>
      isInsideArea({
        center: { x: this.x, y: this.y },
        radius: this.radius,
        target: { x: enemy.x, y: enemy.y },
      })
    );
  };

  private damageEnemiesInsideArea = () => {
    // todo add damage to reduceHealth
    this.enemies.forEach((enemy) => {
      enemy.reduceHealth();
    });
  };

  getEnemiesInsideArea = () => {
    return this.enemies;
  };
}
