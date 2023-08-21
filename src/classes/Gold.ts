import { dom } from "../main";

export class Gold {
  private menuItem;
  private startGold = 100;
  private currentGold = this.startGold;

  staticGoldIncrease = 50;
  percentageGoldIncrease = 10;

  constructor() {
    this.menuItem = document.createElement("div");
    this.menuItem.classList.add("menu-item", "menu-item-stats");
    this.menuItem.id = "menu-item-gold";
    this.menuItem.innerHTML = `Gold: <br>${this.currentGold}`;

    dom.menuContainer.addMenuItemGold(this.menuItem);
  }

  getCurrentGold() {
    return this.currentGold;
  }

  reduceGold = (amount: number) => {
    this.currentGold -= amount;
    this.update();
  };

  increaseGoldAfterRound = () => {
    const percentage = (this.percentageGoldIncrease / 100) * this.currentGold;
    this.currentGold = Math.round(
      this.currentGold + this.staticGoldIncrease + percentage
    );
    this.update();
  };

  increaseGoldAfterKillEnemy = (amount: number) => {
    this.currentGold += amount;
    this.update();
  };

  private update() {
    this.menuItem.innerHTML = `Gold: <br>${this.currentGold}`;
  }
}
