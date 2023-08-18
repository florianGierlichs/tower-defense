import { dom } from "../main";

export class Gold {
  private menuItem;
  private startGold = 100;
  private gold = this.startGold;

  constructor() {
    this.menuItem = document.createElement("div");
    this.menuItem.classList.add("menu-item", "menu-item-stats");
    this.menuItem.id = "menu-item-gold";
    this.menuItem.innerHTML = `Gold: <br>${this.gold}`;

    dom.menuContainer.addMenuItemGold(this.menuItem);
  }

  getGold() {
    return this.gold;
  }

  update(gold: number) {
    this.gold = gold;
    this.menuItem.innerHTML = `Gold: <br>${this.gold}`;
  }
}
