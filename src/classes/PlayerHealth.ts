import { dom } from "../main";

export class PlayerHealth {
  private startHealth = 100;
  private currentHealth = this.startHealth;
  private menuItem;

  constructor() {
    this.menuItem = document.createElement("div");
    this.menuItem.classList.add("menu-item");
    this.menuItem.id = "menu-item-health";
    this.menuItem.innerHTML = `Health: ${this.currentHealth}`;

    dom.menuContainer.addMenuItemPlayerHealth(this.menuItem);
  }

  getCurrentHealth = () => {
    return this.currentHealth;
  };

  reduceHealth = (amount: number = 10) => {
    // todo maybe different enemies can reduce different amounts of health
    this.currentHealth -= amount;
    this.update();
  };

  private update = () => {
    this.menuItem.innerHTML = `Health: ${this.currentHealth}`;
  };
}
