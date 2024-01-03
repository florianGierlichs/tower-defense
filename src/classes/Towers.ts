import { MenuTower, TowerInstance } from "../utils/types";
import { getTowerInstance } from "../utils/getTowerInstance";
import { Obelisk } from "./towers/Obelisk";

export class Towers {
  towers: TowerInstance[] = [];

  constructor() {}

  private updateTowers = () => {
    this.towers.forEach((tower) => tower.update());
  };

  resetTowerTarget = (enemyId: string) => {
    this.towers.forEach((tower) => {
      if (tower instanceof Obelisk) return; // needs to be changed if more buff towers are added
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

  getTowerById = (id: string) => {
    return this.towers.find((tower) => tower.id === id);
  };

  getAllTowers = () => {
    return this.towers;
  };

  hideTowerRange = () => {
    this.towers.forEach((tower) => tower.setShowRange(false));
  };

  update = () => {
    this.updateTowers();
  };
}
