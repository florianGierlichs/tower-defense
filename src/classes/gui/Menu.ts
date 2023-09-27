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
      name: "Arcane Archer",
      range: TowerArcaneArcher.config.range,
      blueprintId: TowerArcaneArcher.config.bluePrint.id,
      price: 40,
      damage: TowerArcaneArcher.config.damage,
      attackSpeed: TowerArcaneArcher.config.attackSpeed,
    },
    {
      id: FireMage.config.id,
      name: "Fire Mage",
      range: FireMage.config.range,
      blueprintId: FireMage.config.bluePrint.id,
      price: 120,
      damage: FireMage.config.damage,
      attackSpeed: FireMage.config.attackSpeed,
    },
    {
      id: LightningMage.config.id,
      name: "Lightning Mage",
      range: LightningMage.config.range,
      blueprintId: LightningMage.config.bluePrint.id,
      price: 100,
      damage: LightningMage.config.damage,
      attackSpeed: LightningMage.config.attackSpeed,
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