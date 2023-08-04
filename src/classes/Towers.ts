import { TowerArcaneArcher } from "./towers/TowerArcaneArcher";
import { MenuTower } from "../utils/types";
import { getTowerInstance } from "../utils/getTowerInstance";

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

  createTower = (x: number, y: number, tower: MenuTower) => {
    this.towers.push(getTowerInstance(tower.id, x, y));
  };

  getTowerForTile = (tileX: number, tileY: number) => {
    return this.towers.find((tower) => tower.x === tileX && tower.y === tileY);
  };

  hideTowerRange = () => {
    this.towers.forEach((tower) => tower.setShowRange(false));
  };

  update = () => {
    this.updateTowers();
  };
}
