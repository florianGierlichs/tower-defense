import { EnemyClasses } from "./Waves";

export class Enemies {
  private currentEnemies: EnemyClasses = [];

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

  setCurrentEnemies = (enemies: EnemyClasses) => {
    this.currentEnemies = enemies;
  };

  update = () => {
    this.updateEnemies();
  };
}
