import { dom } from "../../main";
import { MenuTower } from "../../utils/types";
import { MenuItemTower } from "./MenuItemTower";
import { FireMage } from "../towers/FireMage";
import { ArcaneArcher } from "../towers/ArcaneArcher";
import { LightningMage } from "../towers/LightningMage";
import { DemonMage } from "../towers/DemonMage";
import { Obelisk } from "../towers/Obelisk";

export class Menu {
  static readonly towers: readonly MenuTower[] = [
    {
      id: ArcaneArcher.config.id,
      config: ArcaneArcher.config,
      price: 40, // todo put to config
    },
    {
      id: LightningMage.config.id,
      config: LightningMage.config,
      price: 120,
    },
    {
      id: FireMage.config.id,
      config: FireMage.config,
      price: 150,
    },
    {
      id: DemonMage.config.id,
      config: DemonMage.config,
      price: 300,
    },
    {
      id: Obelisk.config.id,
      config: Obelisk.config,
      price: 100,
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
