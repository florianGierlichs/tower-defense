import { dom } from "../main";
import { MenuTower } from "../utils/types";

export class MenuItemTower {
  constructor(
    tower: MenuTower,
    selectTowerCallback: (tower: MenuTower) => void
  ) {
    const clickHandler = () => {
      selectTowerCallback(tower);
    };
    dom.createMenuItemTower(tower, clickHandler);
  }
}
