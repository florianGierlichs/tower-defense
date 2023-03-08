import { canvasGame, game } from "../main";
import { TowerName, TowerNames } from "./Game";
import { MenuItemTower } from "./MenuItemTower";

const test = () => console.log("hallo welt");

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
    const appContainer = game.getAppContainer();
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

  selectTower = (tower: TowerName | null) => {
    this.setSelectedTower(tower);
    this.addMouseMoveEvent();
  };
}
