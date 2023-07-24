import { dom, events } from "../main";
import { TowerNames, TowerType } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

export class Menu {
  selectedTower: TowerType | null = null;

  constructor(towerNames: TowerNames) {
    towerNames.forEach((tower) => {
      new MenuItemTower(tower, this.selectTower);
    });
  }

  setSelectedTower = (tower: TowerType | null) => {
    this.selectedTower = tower;
    dom.removeAllClassesFromAppContainer();
    if (tower !== null) {
      dom.addTowerMouseCursor(tower);
    }
  };

  private selectTower = (tower: TowerType) => {
    this.setSelectedTower(tower);
    if (this.selectedTower === null) {
      throw new Error("selectedTower is null");
    }
    events.towerBluePrintEvent.addTowerBluePrintMouseMoveEvent(
      this.selectedTower
    );
    events.placeTowerEvent.addPlaceTowerClickEvent(tower);

    events.cleanUpSelectTowerClickEvent.addCleanUpSelectTowerClickEvent();
  };
}
