import shortUUID from "short-uuid";
import { game } from "../main";
import { getDistance } from "../utils/getDistance";
import { timeHasPassed } from "../utils/timeHasPassed";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

export class Tower {
  id;
  x;
  y;
  width: number = 24;
  height: number = 24;
  range: number = 150;
  attackSpeed: number = 1000; // Miliseconds
  lastAttack: number | null = null;
  color: string = "green";
  projectiles: Projectile[] = [];
  currentTarget: Enemy | null = null;

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }

  private setClosestEnemyInRange = () => {
    let distanceOfClosestEnemy = Infinity;

    game.enemies.getEnemies().forEach((enemy) => {
      const enemyDistance = getDistance(
        { x: this.x, y: this.y },
        { x: enemy.x, y: enemy.y }
      );

      if (
        enemyDistance <= this.range &&
        enemyDistance <= distanceOfClosestEnemy
      ) {
        distanceOfClosestEnemy = enemyDistance;
        this.currentTarget = enemy;
      }
    });
  };

  private checkCurrentTargetIsInRage = () => {
    if (this.currentTarget) {
      const currentTargetDistance = getDistance(
        { x: this.x, y: this.y },
        { x: this.currentTarget.x, y: this.currentTarget.y }
      );

      if (currentTargetDistance > this.range) {
        this.currentTarget = null;
      } else {
        if (timeHasPassed(this.lastAttack, this.attackSpeed)) {
          this.createProjectile();
          this.lastAttack = performance.now();
        }
      }
    }
  };

  private createProjectile = () => {
    if (this.currentTarget) {
      this.projectiles.push(
        new Projectile(
          shortUUID.generate(),
          this.x,
          this.y,
          this.currentTarget,
          this.removeProjectile
        )
      );
    }
  };

  private updateProjectiles = () => {
    this.projectiles.forEach((projectile) => projectile.update());
  };

  private removeProjectile = (id: string) => {
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.id !== id
    );
  };

  removeTarget = () => {
    this.currentTarget = null;
  };

  updateProperties = () => {
    this.updateProjectiles();

    if (this.currentTarget) {
      this.checkCurrentTargetIsInRage();
    } else {
      this.setClosestEnemyInRange();
    }
  };
}
