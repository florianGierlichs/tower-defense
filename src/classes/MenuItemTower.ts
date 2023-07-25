import { TowerConfig } from "../data/towerConfig";
import { dom } from "../main";

export class MenuItemTower {
  constructor(
    tower: TowerConfig,
    selectTowerCallback: (tower: TowerConfig) => void
  ) {
    const clickHandler = () => {
      selectTowerCallback(tower);
    };
    dom.createMenuItemTower(tower, clickHandler);
  }
}
