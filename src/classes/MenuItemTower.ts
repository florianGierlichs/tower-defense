import { dom } from "../main";
import { TowerType } from "./Game";

export class MenuItemTower {
  constructor(
    name: TowerType,
    selectTowerCallback: (tower: TowerType) => void
  ) {
    const clickHandler = () => {
      selectTowerCallback(name);
    };
    dom.createMenuItemTower(name, clickHandler);
  }
}
