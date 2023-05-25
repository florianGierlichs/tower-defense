import { canvasGame, game } from "../main";
import { TowerName, TowerNames } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

const test = () => console.log("hallo welt"); // todo Add tower BP for tile on hover

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

  private addMouseMoveEvent = () => {
    canvasGame.addEventListener("mousemove", test);
  };

  private removeMouseMoveEvent = () => {
    canvasGame.removeEventListener("mousemove", test);
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
