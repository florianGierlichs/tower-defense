import { dom, game } from "../main";
import { getTileForHover } from "../utils/getTileForHover";
import { TowerName, TowerNames } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

const test = (e: MouseEvent) => {
  console.log("tile: ", getTileForHover(e));
}; // todo Add tower BP for tile on hover

export class Menu {
  selectedTower: TowerName | null = null;
  towersContainer;
  appContainer;

  constructor(towerNames: TowerNames, appContainer: HTMLDivElement) {
    this.towersContainer = document.querySelector<HTMLDivElement>(
      "#menu-towers-container"
    )!;

    this.appContainer = appContainer;

    towerNames.forEach((tower) => {
      new MenuItemTower(this.towersContainer, tower, () =>
        this.selectTower(tower)
      );
    });
  }

  private setSelectedTower = (tower: TowerName | null) => {
    this.selectedTower = tower;
    const appContainer = this.appContainer;
    appContainer.className = "";
    if (tower !== null) {
      appContainer.classList.add(`${tower}Cursor`);
    }
  };

  private showTowerBpForSelectedTower = (e: MouseEvent) => {
    game.showTowerBb(e, this.selectedTower);
  };

  private addMouseMoveEvent = () => {
    dom.canvasGame.addEventListener(
      "mousemove",
      this.showTowerBpForSelectedTower
    );
  };

  private removeMouseMoveEvent = () => {
    dom.canvasGame.removeEventListener(
      "mousemove",
      this.showTowerBpForSelectedTower
    );
  };

  private selectTower = (tower: TowerName) => {
    this.setSelectedTower(tower);
    this.addMouseMoveEvent();
    game.addPlaceTowerOnTileClickEventForCanvasGame(tower);
  };

  private unselectTower = () => {
    this.setSelectedTower(null);
    this.removeMouseMoveEvent();
    this.appContainer.removeEventListener("click", this.unselectTower);
  };

  update = () => {
    if (this.selectedTower !== null) {
      this.appContainer.addEventListener("click", this.unselectTower);
    }
  };
}
