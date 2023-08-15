import { MenuTower } from "../utils/types";

export class MenuItemTower {
  tower;
  selectTowerCallback;
  addToMenuTowersContainerCallback;

  constructor(
    tower: MenuTower,
    selectTowerCallback: (tower: MenuTower) => void,
    addToMenuTowersContainerCallback: (child: HTMLElement) => void
  ) {
    this.tower = tower;
    this.selectTowerCallback = selectTowerCallback;
    this.addToMenuTowersContainerCallback = addToMenuTowersContainerCallback;

    const element = document.createElement("div");
    element.classList.add("menu-item");
    element.id = tower.id;
    element.addEventListener("click", this.clickHandler);
    this.addToMenuTowersContainerCallback(element);
  }

  clickHandler = () => {
    this.selectTowerCallback(this.tower);
  };
}
