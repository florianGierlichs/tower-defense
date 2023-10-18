import { dom } from "../../main";
import { MenuTower } from "../../utils/types";
import { TowerStatsScreen } from "./TowerStatsScreen";

export class MenuItemTower {
  tower;
  container;
  element;
  innerElement;
  selectTowerCallback;
  showTowerStats = false;
  stats;

  constructor(
    tower: MenuTower,
    selectTowerCallback: (tower: MenuTower) => void
  ) {
    this.tower = tower;
    this.selectTowerCallback = selectTowerCallback;

    this.container = document.createElement("div");
    this.container.classList.add("menu-item-container");

    this.element = document.createElement("div");
    this.element.classList.add("menu-item-tower");

    this.innerElement = document.createElement("div");
    this.innerElement.classList.add("menu-item-tower__inner");
    this.innerElement.id = tower.id;

    this.element.addEventListener("click", this.clickHandler);
    this.container.addEventListener("mouseover", this.showStats);
    this.container.addEventListener("mouseleave", this.removeStats);

    this.element.appendChild(this.innerElement);
    this.container.appendChild(this.element);
    dom.menuContainer.addChildToMenuTowersContainer(this.container);

    this.stats = new TowerStatsScreen(this.tower);
  }

  private clickHandler = () => {
    this.selectTowerCallback(this.tower);
  };

  private showStats = () => {
    if (!this.showTowerStats) {
      this.container.appendChild(this.stats.getContainer());
      this.showTowerStats = true;
    }
  };

  private removeStats = () => {
    this.container.removeChild(this.stats.getContainer());
    this.showTowerStats = false;
  };
}
