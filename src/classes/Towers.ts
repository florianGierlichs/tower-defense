import shortUUID from "short-uuid";
import { TowerArcaneArcher } from "./TowerArcaneArcher";

export class Towers {
  towers: TowerArcaneArcher[] = [];

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
    this.towers.push(new TowerArcaneArcher(shortUUID.generate(), x, y));
  };

  update = () => {
    this.updateTowers();
  };
}
