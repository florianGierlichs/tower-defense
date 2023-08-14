import { dom } from "../main";
import { MenuTower } from "../utils/types";

export class MenuItemTower {
  tower;
  selectTowerCallback;

  constructor(
    tower: MenuTower,
    selectTowerCallback: (tower: MenuTower) => void
  ) {
    this.tower = tower;
    this.selectTowerCallback = selectTowerCallback;

    const element = document.createElement("div");
    element.classList.add("menu-item");
    element.id = tower.id;
    element.addEventListener("click", this.clickHandler);
    dom.addChildToMenuTowersContainer(element);
  }

  clickHandler = () => {
    this.selectTowerCallback(this.tower);
  };
}
