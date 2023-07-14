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

  setSelectedTower = (tower: TowerName | null) => {
    this.selectedTower = tower;
    dom.appContainer.className = "";
    if (tower !== null) {
      dom.appContainer.classList.add(`${tower}Cursor`); // todo put into methode in DomController
    }
  };

  private selectTower = (tower: TowerName) => {
    this.setSelectedTower(tower);
    if (this.selectedTower === null) {
      throw new Error("selectedTower is null");
    }
    game.events.towerBluePrintEvent.addTowerBluePrintMouseMoveEvent(
      this.selectedTower
    );
    game.events.placeTowerEvent.addPlaceTowerClickEvent(tower);

    game.events.cleanUpSelectTowerClickEvent.addCleanUpSelectTowerClickEvent();
  };
}
