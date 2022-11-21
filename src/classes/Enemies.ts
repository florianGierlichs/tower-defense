import { Enemy } from "./Enemy";

export class Enemies {
  enemies: Enemy[];

  constructor(pathNodes: number[][]) {
    this.enemies = [
      new Enemy(1, 40, 100, pathNodes),
      new Enemy(2, 0, 100, pathNodes),
      new Enemy(3, -40, 100, pathNodes),
      new Enemy(4, -80, 100, pathNodes),
    ];
  }

  remove = (id: number) => {
    this.enemies = this.enemies.filter((enemy) => enemy.id !== id);
  };

  private updateEnemies = () => {
    this.enemies.forEach((enemy) => enemy.update());
  };

  getEnemies = () => this.enemies;

  update = () => {
    this.updateEnemies();
  };
}
