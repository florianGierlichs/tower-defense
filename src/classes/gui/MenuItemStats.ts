import { dom } from "../../main";

export class MenuItemStats {
  private menuItem;
  private textElement;

  constructor(id: string, text: string) {
    this.menuItem = document.createElement("div");
    this.menuItem.classList.add("menu-item-stats");
    this.menuItem.id = `menu-item-${id}`;

    this.textElement = document.createElement("span");
    this.textElement.classList.add("menu-item-stats-content");
    this.textElement.innerText = text;
    this.menuItem.appendChild(this.textElement);

    dom.menuContainer.addMenuItemPlayerHealth(this.menuItem);
  }

  update = (text: string) => {
    this.textElement.innerText = text;
  };

  getElement = () => {
    return this.menuItem;
  };
}
