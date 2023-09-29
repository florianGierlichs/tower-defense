import { GoldInfoScreen } from "./gui/GoldInfoScreen";
import { MenuItemStats } from "./gui/MenuItemStats";

export class Gold {
  private menuItem;
  private startGold = 100;
  private currentGold = this.startGold;
  private collectedBountyGoldPerRound = 0;
  private percentageGoldIncreasePerRound = 0;
  private infoScreen;
  private showInfoScreen = false;

  staticGoldIncrease = 50;
  percentageGoldIncrease = 10;

  constructor() {
    this.menuItem = new MenuItemStats("gold", this.currentGold.toString());

    this.menuItem.getElement().addEventListener("mouseover", this.showInfo);
    this.menuItem.getElement().addEventListener("mouseleave", this.removeInfo);

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
      this.menuItem.getElement().appendChild(this.infoScreen.getContainer());
      this.showInfoScreen = true;
    }
  };

  private removeInfo = () => {
    this.menuItem.getElement().removeChild(this.infoScreen.getContainer());
    this.showInfoScreen = false;
  };

  private update() {
    this.menuItem.update(this.currentGold.toString());
  }
}
