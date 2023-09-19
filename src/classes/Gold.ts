import { dom } from "../main";
import { GoldInfoScreen } from "./gui/GoldInfoScreen";

export class Gold {
  private menuItem;
  private text;
  private startGold = 100;
  private currentGold = this.startGold;
  private collectedBountyGoldPerRound = 0;
  private percentageGoldIncreasePerRound = 0;
  private infoScreen;
  private showInfoScreen = false;

  staticGoldIncrease = 50;
  percentageGoldIncrease = 10;

  constructor() {
    this.menuItem = document.createElement("div");
    this.menuItem.classList.add(
      "menu-item",
      "menu-item-stats",
      "menu-item-container"
    );
    this.menuItem.id = "menu-item-gold";

    this.text = document.createElement("p");
    this.text.innerHTML = `Gold: <br>${this.currentGold}`;
    this.menuItem.appendChild(this.text);

    dom.menuContainer.addMenuItemGold(this.menuItem);

    this.menuItem.addEventListener("mouseover", this.showInfo);
    this.menuItem.addEventListener("mouseleave", this.removeInfo);

    this.infoScreen = new GoldInfoScreen(
      this.percentageGoldIncrease,
      this.staticGoldIncrease
    );
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

  private showInfo = () => {
    if (!this.showInfoScreen) {
      this.menuItem.appendChild(this.infoScreen.getContainer());
      this.showInfoScreen = true;
    }
  };

  private removeInfo = () => {
    this.menuItem.removeChild(this.infoScreen.getContainer());
    this.showInfoScreen = false;
  };

  private update() {
    this.text.innerHTML = `Gold: <br>${this.currentGold}`;
  }
}
