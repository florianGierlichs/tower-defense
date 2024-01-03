import { createStatsText } from "../../utils/createStatsText";
import { MenuTower } from "../../utils/types";

export class BuffTowerStatsScreen {
  tower;
  container;

  constructor(tower: MenuTower) {
    this.tower = tower;

    this.container = document.createElement("div");
    this.container.classList.add("tower-stats-container", "box-shadow");

    createStatsText(this.container, tower.config.name);

    const description = document.createElement("p");
    description.classList.add("tower-stats-description");
    description.innerText = tower.config.description;
    this.container.appendChild(description);

    createStatsText(
      this.container,
      "DMG Buff:",
      tower.config.damage.toString() + "%"
    );
    createStatsText(this.container, "Range:", tower.config.range.toString());
    createStatsText(
      this.container,
      "Buff speed:",
      tower.config.attackSpeed.toString()
    );
    createStatsText(this.container, "Price:", tower.price.toString());
  }

  getContainer = () => {
    return this.container;
  };
}
