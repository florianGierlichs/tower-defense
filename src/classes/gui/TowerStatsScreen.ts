import { MenuTower } from "../../utils/types";

export class TowerStatsScreen {
  tower;
  container;

  constructor(tower: MenuTower) {
    this.tower = tower;

    this.container = document.createElement("div");
    this.container.classList.add("tower-stats-container", "box-shadow");

    this.createStatsText(tower.name);
    this.createStatsText("Damage:", tower.damage.toString());
    this.createStatsText("Range:", tower.range.toString());
    this.createStatsText("Attack speed:", tower.attackSpeed.toString());
    this.createStatsText("Price:", tower.price.toString());
  }

  private createStatsText = (key: string, value?: string) => {
    const p = document.createElement("p");
    p.classList.add("tower-stats-text");

    const keyEl = document.createElement("span");
    keyEl.classList.add("tower-stats-text-key");
    keyEl.innerHTML = key;
    p.appendChild(keyEl);

    if (value !== undefined) {
      const valueEl = document.createElement("span");
      valueEl.classList.add("tower-stats-text-value");
      valueEl.innerHTML = value;
      p.appendChild(valueEl);
    }
    this.container.appendChild(p);
  };

  getContainer = () => {
    return this.container;
  };
}
