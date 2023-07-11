import { dom, game } from "../main";
import { TowerName, TowerNames } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

export class Menu {
  selectedTower: TowerName | null = null;
  towersContainer;

  constructor(towerNames: TowerNames) {
    this.towersContainer = document.querySelector<HTMLDivElement>(
      "#menu-towers-container"
    )!;

    towerNames.forEach((tower) => {
      new MenuItemTower(this.towersContainer, tower, () =>
        this.selectTower(tower)
      );
    });
  }

  private setSelectedTower = (tower: TowerName | null) => {
    this.selectedTower = tower;
    dom.appContainer.className = "";
    if (tower !== null) {
      dom.appContainer.classList.add(`${tower}Cursor`);
    }
  };

  private selectTower = (tower: TowerName) => {
    this.setSelectedTower(tower);
    if (this.selectedTower === null) {
      throw new Error("selectedTower is null");
    }
    game.events.addMouseMoveEvent(this.selectedTower);
    game.events.addPlaceTowerClickEvent(tower);
    game.events.addUnselectTowerClickEvent();
  };

  unselectTower = () => {
    this.setSelectedTower(null);
  };
}
