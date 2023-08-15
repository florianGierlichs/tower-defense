import { game } from "../main";
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

  container;
  selectedTower: MenuTower | null = null;

  constructor() {
    const container = document.querySelector<HTMLDivElement>(
      "#menu-towers-container"
    );
    if (container === null) throw new Error("Menu container not found");
    this.container = container;

    Menu.towers.forEach((tower) => {
      new MenuItemTower(
        tower,
        this.selectTower,
        this.addChildToMenuTowersContainer
      );
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

    game.dom.removeAllClassesFromBody();
    if (tower !== null) {
      game.dom.addTowerMouseCursor(tower);
    }
  };

  private addChildToMenuTowersContainer = (child: HTMLElement) => {
    this.container.appendChild(child);
  };
}
