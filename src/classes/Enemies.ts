import shortUUID from "short-uuid";
import { Enemy } from "./Enemy";
import { PathNode } from "./Game";

export class Enemies {
  enemies: Enemy[];

  constructor(pathNodes: PathNode[]) {
    this.enemies = [
      new Enemy(shortUUID.generate(), 40, 160, pathNodes),
      new Enemy(shortUUID.generate(), 0, 160, pathNodes),
      new Enemy(shortUUID.generate(), -40, 160, pathNodes),
      new Enemy(shortUUID.generate(), -80, 160, pathNodes),
      new Enemy(shortUUID.generate(), -120, 160, pathNodes),
      new Enemy(shortUUID.generate(), -160, 160, pathNodes),
      new Enemy(shortUUID.generate(), -200, 160, pathNodes),
      new Enemy(shortUUID.generate(), -240, 160, pathNodes),
      new Enemy(shortUUID.generate(), -280, 160, pathNodes),
    ];
  }

  remove = (id: string) => {
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
