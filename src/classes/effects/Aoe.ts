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
  towerSourceId;

  enemiesInsideArea: Enemy[] = [];

  constructor(
    id: string,
    x: number,
    y: number,
    radius: number,
    damage: number,
    towerSourceId: string
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.damage = damage;
    this.towerSourceId = towerSourceId;

    this.setEnemiesInsideArea();

    this.damageEnemiesInsideArea();
  }

  private setEnemiesInsideArea = () => {
    this.enemiesInsideArea = game.enemies.getCurrentEnemies().filter((enemy) =>
      isInsideArea({
        center: { x: this.x, y: this.y },
        radius: this.radius,
        target: { x: enemy.x, y: enemy.y },
      })
    );
  };

  private damageEnemiesInsideArea = () => {
    this.enemiesInsideArea.forEach((enemy) => {
      enemy.reduceHealth(this.damage, this.towerSourceId);
    });
  };

  getEnemiesInsideArea = () => {
    return this.enemiesInsideArea;
  };
}
