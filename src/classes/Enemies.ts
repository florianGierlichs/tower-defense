import { EnemyInstance } from "../utils/types";

export class Enemies {
  private currentEnemies: EnemyInstance[] = [];
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

  setCurrentEnemies = (enemies: EnemyInstance[]) => {
    this.currentEnemies = enemies;
    this.allEnemiesRemoved = false;
  };

  update = () => {
    this.updateEnemies();

    if (this.currentEnemies.length === 0) {
      this.allEnemiesRemoved = true;
    }
  };
}
