import shortUUID from "short-uuid";
import { TowerArcaneArcher } from "./TowerArcaneArcher";
import { TowerName } from "./Game";

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

  createTower = (x: number, y: number, tower: TowerName) => {
    // todo use tower to determine which tower needs to be pushed
    console.log(tower);
    this.towers.push(new TowerArcaneArcher(shortUUID.generate(), x, y));
  };

  getTowerForTile = (tileX: number, tileY: number) => {
    return this.towers.find((tower) => tower.x === tileX && tower.y === tileY);
  };

  hideTowerRanger = () => {
    this.towers.forEach((tower) => tower.setShowRange(false));
  };

  update = () => {
    this.updateTowers();
  };
}
