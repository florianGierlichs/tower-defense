import { dom, game } from "../main";
import { TowerNames, TowerType } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

export class Menu {
  selectedTower: TowerType | null = null;
  towersContainer;

  constructor(towerNames: TowerNames) {
    this.towersContainer = document.querySelector<HTMLDivElement>( // todo put this in DomController
      "#menu-towers-container"
    )!;

    towerNames.forEach((tower) => {
      new MenuItemTower(this.towersContainer, tower, () =>
        this.selectTower(tower)
      );
    });
  }

  setSelectedTower = (tower: TowerType | null) => {
    this.selectedTower = tower;
    dom.appContainer.className = "";
    if (tower !== null) {
      dom.appContainer.classList.add(`${tower}Cursor`); // todo put into methode in DomController
    }
  };

  private selectTower = (tower: TowerType) => {
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
