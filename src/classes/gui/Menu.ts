import { dom } from "../../main";
import { MenuTower } from "../../utils/types";
import { MenuItemTower } from "./MenuItemTower";
import { FireMage } from "../towers/FireMage";
import { TowerArcaneArcher } from "../towers/TowerArcaneArcher";

export class Menu {
  static readonly towers: readonly MenuTower[] = [
    {
      id: TowerArcaneArcher.config.id,
      range: TowerArcaneArcher.config.range,
      blueprintId: TowerArcaneArcher.config.bluePrint.id,
      price: 100,
    },
    {
      id: FireMage.config.id,
      range: FireMage.config.range,
      blueprintId: FireMage.config.bluePrint.id,
      price: 200,
    },
  ] as const;

  selectedTower: MenuTower | null = null;

  constructor() {
    Menu.towers.forEach((tower) => {
      new MenuItemTower(tower, this.selectTower);
    });
  }

  getSelectedTower = () => {
    return this.selectedTower;
  };

  setSelectedTower = (tower: MenuTower | null) => {
    this.selectedTower = tower;
  };

  private selectTower = (tower: MenuTower) => {
    this.setSelectedTower(tower);

    dom.body.removeAllClassesFromBody();
    if (tower !== null) {
      dom.body.addTowerMouseCursor(tower);
    }
  };
}
