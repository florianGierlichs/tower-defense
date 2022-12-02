import { Tower } from "./Tower";

export class Towers {
  towers = [
    new Tower(438, 240),
    new Tower(210, 320),
    new Tower(210, 240),
    new Tower(438, 360),
  ];

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

  update = () => {
    this.updateTowers();
  };
}
