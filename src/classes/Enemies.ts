import { BossInstance, EnemyInstance } from "../utils/types";

export class Enemies {
  private currentEnemies: (EnemyInstance | BossInstance)[] = [];
  allEnemiesRemoved = true;

  constructor() {}

  private updateEnemies = () => {
    this.currentEnemies.forEach((enemy) => enemy.update());
  };

  remove = (id: string) => {
    this.currentEnemies = this.currentEnemies.filter(
      (enemy) => enemy.id !== id
    );
  };

  getCurrentEnemies = () => this.currentEnemies;

  setCurrentEnemies = (enemies: (EnemyInstance | BossInstance)[]) => {
    this.currentEnemies = enemies;
    this.allEnemiesRemoved = false;
  };

  currentEnemiesPush = (enemy: EnemyInstance | BossInstance) => {
    this.currentEnemies.push(enemy);
  };

  update = () => {
    this.updateEnemies();

    if (this.currentEnemies.length === 0) {
      this.allEnemiesRemoved = true;
    }
  };
}
