import { TowerName } from "./Game";

export class MenuItemTower {
  element;

  constructor(
    containerNode: HTMLDivElement,
    name: TowerName,
    clickHandler: () => void
  ) {
    this.element = document.createElement("div");
    this.element.classList.add("menu-item");
    this.element.id = name;
    this.element.addEventListener("click", clickHandler);
    containerNode.appendChild(this.element);
  }
}
