import { Tower } from "./Tower";

export class Towers {
  towers: Tower[] = [];

  constructor() {}

  private updateTowers = () => {
    this.towers.forEach((tower) => tower.update());
  };

  resetTowerTarget = (enemyId: string) => {
    this.towers.forEach((tower) => {
      if (tower.currentTarget?.id === enemyId) {
        tower.removeTarget();
      }
    });
  };

  createTower = (x: number, y: number) => {
    this.towers.push(new Tower(x, y));
  };

  update = () => {
    this.updateTowers();
  };
}
