import { dom, events } from "../main";
import { MenuTower } from "../utils/types";
import { MenuItemTower } from "./MenuItemTower";
import { FireMage } from "./towers/FireMage";
import { TowerArcaneArcher } from "./towers/TowerArcaneArcher";

export class Menu {
  static readonly towers: readonly MenuTower[] = [
    {
      id: TowerArcaneArcher.config.id,
      range: TowerArcaneArcher.config.range,
      blueprintId: TowerArcaneArcher.config.bluePrint.id,
    },
    {
      id: FireMage.config.id,
      range: FireMage.config.range,
      blueprintId: FireMage.config.bluePrint.id,
    },
  ] as const;

  selectedTower: MenuTower | null = null;

  constructor() {
    Menu.towers.forEach((tower) => {
      new MenuItemTower(tower, this.selectTower);
    });
  }

  setSelectedTower = (tower: MenuTower | null) => {
    this.selectedTower = tower;
    dom.removeAllClassesFromAppContainer();
    if (tower !== null) {
      dom.addTowerMouseCursor(tower);
    }
  };

  private selectTower = (tower: MenuTower) => {
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
