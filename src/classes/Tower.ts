import shortUUID from "short-uuid";
import { ctx, game } from "../main";
import { getDistance } from "../utils/getDistance";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";

export class Tower {
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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  };

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
        const timestamp = performance.now();
        if (
          !this.lastAttack ||
          timestamp - this.lastAttack >= this.attackSpeed
        ) {
          this.createProjectile();
          this.lastAttack = performance.now();
        }
      }
    }
  };

  private createProjectile = () => {
    if (this.currentTarget) {
      this.projectiles.push(
        new Projectile(shortUUID.generate(), this.x, this.y, this.currentTarget)
      );
    }
  };

  private updateProjectiles = () => {
    this.projectiles.forEach((projectile) =>
      projectile.update({
        removeProjectile: this.removeProjectile,
        removeTowerTarget: this.removeTarget,
      })
    );
  };

  private removeProjectile = (id: string) => {
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.id !== id
    );
  };

  private removeTarget = () => {
    this.currentTarget = null;
  };

  update = () => {
    this.draw();
    this.updateProjectiles();

    if (this.currentTarget) {
      this.checkCurrentTargetIsInRage();
    } else {
      this.setClosestEnemyInRange();
    }
  };
}
