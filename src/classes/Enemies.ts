import { EnemyInstance } from "../utils/types";

export class Enemies {
  private currentEnemies: EnemyInstance[] = [];

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
  };

  update = () => {
    this.updateEnemies();
  };
}
