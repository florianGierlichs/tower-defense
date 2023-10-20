import { MenuItemStats } from "./gui/MenuItemStats";

export class PlayerHealth {
  private startHealth = 100;
  private currentHealth = this.startHealth;
  private menuItem;

  constructor() {
    this.menuItem = new MenuItemStats("health", this.currentHealth.toString());
  }

  getCurrentHealth = () => {
    return this.currentHealth;
  };

  reduceHealth = (amount: number = 5) => {
    // todo maybe different enemies can reduce different amounts of health
    this.currentHealth -= amount;
    this.update();
  };

  private update = () => {
    this.menuItem.update(this.currentHealth.toString());
  };
}
