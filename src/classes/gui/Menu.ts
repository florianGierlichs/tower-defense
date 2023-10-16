import { dom } from "../../main";
import { MenuTower } from "../../utils/types";
import { MenuItemTower } from "./MenuItemTower";
import { FireMage } from "../towers/FireMage";
import { TowerArcaneArcher } from "../towers/TowerArcaneArcher";
import { LightningMage } from "../towers/LightningMage";

export class Menu {
  static readonly towers: readonly MenuTower[] = [
    {
      id: TowerArcaneArcher.config.id,
      config: TowerArcaneArcher.config,
      price: 40,
    },
    {
      id: LightningMage.config.id,
      config: LightningMage.config,
      price: 100,
    },
    {
      id: FireMage.config.id,
      config: FireMage.config,
      price: 120,
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
