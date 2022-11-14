import { Tower } from "./Tower";

export class Towers {
  towers = [new Tower(438, 240), new Tower(210, 320)];

  constructor() {}

  private updateTowers = () => {
    this.towers.forEach((tower) => tower.update());
  };

  update = () => {
    this.updateTowers();
  };
}
