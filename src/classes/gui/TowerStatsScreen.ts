import { createStatsText } from "../../utils/createStatsText";
import { MenuTower } from "../../utils/types";

export class TowerStatsScreen {
  tower;
  container;

  constructor(tower: MenuTower) {
    this.tower = tower;

    this.container = document.createElement("div");
    this.container.classList.add("tower-stats-container", "box-shadow");

    createStatsText(this.container, tower.name);
    createStatsText(this.container, "Damage:", tower.damage.toString());
    createStatsText(this.container, "Range:", tower.range.toString());
    createStatsText(
      this.container,
      "Attack speed:",
      tower.attackSpeed.toString()
    );
    createStatsText(this.container, "Price:", tower.price.toString());
  }

  getContainer = () => {
    return this.container;
  };
}
