import { dom } from "../main";

export class Gold {
  private menuItem;
  private startGold = 100;
  private currentGold = this.startGold;
  private collectedBountyGoldPerRound = 0;
  private percentageGoldIncreasePerRound = 0;

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

  getCollectedBountyGoldPerRound() {
    return this.collectedBountyGoldPerRound;
  }

  getPercentageGoldIncreasePerRound() {
    return this.percentageGoldIncreasePerRound;
  }

  reduceGold = (amount: number) => {
    this.currentGold -= amount;
    this.update();
  };

  increaseGoldAfterRound = () => {
    this.percentageGoldIncreasePerRound = Math.round(
      (this.percentageGoldIncrease / 100) * this.currentGold
    );
    this.currentGold = Math.round(
      this.currentGold +
        this.staticGoldIncrease +
        this.percentageGoldIncreasePerRound
    );
    this.update();
  };

  increaseGoldAfterKillEnemy = (amount: number) => {
    this.collectedBountyGoldPerRound += amount;
    this.currentGold += amount;
    this.update();
  };

  resetDynamicGoldIncreasePerRound = () => {
    this.collectedBountyGoldPerRound = 0;
    this.percentageGoldIncreasePerRound = 0;
  };

  private update() {
    this.menuItem.innerHTML = `Gold: <br>${this.currentGold}`;
  }
}
