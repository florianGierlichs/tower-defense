import { game } from "../../main";
import { isInsideArea } from "../../utils/isInsideArea";
import { timeHasPassed } from "../../utils/timeHasPassed";
import { Enemy } from "../enemies/Enemy";

export class DamageOverTimeArea {
  // initial values
  id;
  x;
  y;
  radius;
  damage;
  damageOverTimeThrottleTime;

  affectedEnemies: { enemy: Enemy; damageHitTime: number | null }[] = [];

  constructor(
    id: string,
    x: number,
    y: number,
    radius: number,
    damage: number,
    damageOverTimeThrottleTime: number
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.damage = damage;
    this.damageOverTimeThrottleTime = damageOverTimeThrottleTime;
  }

  private isAffectedEnemy = (enemy: Enemy) => {
    return this.affectedEnemies.find(
      (affectedEnemy) => affectedEnemy.enemy === enemy
    );
  };

  private updateEnemiesInsideArea = () => {
    game.enemies.getCurrentEnemies().forEach((enemy) => {
      if (
        isInsideArea({
          center: { x: this.x, y: this.y },
          radius: this.radius,
          target: { x: enemy.x, y: enemy.y },
        }) &&
        !this.isAffectedEnemy(enemy)
      ) {
        // enemy is inside area but not affected yet
        this.affectedEnemies.push({ enemy, damageHitTime: null });
      } else if (
        !isInsideArea({
          center: { x: this.x, y: this.y },
          radius: this.radius,
          target: { x: enemy.x, y: enemy.y },
        }) &&
        this.isAffectedEnemy(enemy)
      ) {
        // enemy is outside area but was affected before
        const index = this.affectedEnemies
          .map((affectedEnemy) => affectedEnemy.enemy)
          .indexOf(enemy);
        this.affectedEnemies.splice(index, 1);
      }
    });
  };

  private damageEnemies = () => {
    this.affectedEnemies.forEach((affectedEnemy) => {
      if (
        affectedEnemy.damageHitTime === null ||
        timeHasPassed(
          affectedEnemy.damageHitTime,
          this.damageOverTimeThrottleTime
        )
      ) {
        // todo add damage to reduceHealth
        affectedEnemy.enemy.reduceHealth();
        affectedEnemy.damageHitTime = performance.now();
      }
    });
  };

  update = () => {
    this.updateEnemiesInsideArea();

    this.damageEnemies();
  };
}
