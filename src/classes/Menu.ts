import { TOWER_CONFIGS, TowerConfig } from "../data/towerConfig";
import { dom, events } from "../main";
import { MenuItemTower } from "./MenuItemTower";

export class Menu {
  selectedTower: TowerConfig | null = null;

  constructor() {
    Object.values(TOWER_CONFIGS).forEach((tower) => {
      new MenuItemTower(tower, this.selectTower);
    });
  }

  setSelectedTower = (tower: TowerConfig | null) => {
    this.selectedTower = tower;
    dom.removeAllClassesFromAppContainer();
    if (tower !== null) {
      dom.addTowerMouseCursor(tower);
    }
  };

  private selectTower = (tower: TowerConfig) => {
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
