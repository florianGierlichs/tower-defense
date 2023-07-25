import { TowerConfig } from "../data/towerConfig";
import { events } from "../main";

export class DomController {
  body;
  appContainer;

  menuTowersContainer;

  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;

  toggleTilesInfoButton;

  constructor() {
    this.body = document.querySelector<HTMLBodyElement>("body")!;
    this.appContainer = document.querySelector<HTMLDivElement>("#app")!;

    this.menuTowersContainer = document.querySelector<HTMLDivElement>(
      "#menu-towers-container"
    )!;

    this.canvasBackground =
      document.querySelector<HTMLCanvasElement>("#canvas-background")!;
    this.canvasGame =
      document.querySelector<HTMLCanvasElement>("#canvas-game")!;

    this.ctxBackground = this.canvasBackground.getContext("2d")!;
    this.ctxGame = this.canvasGame.getContext("2d")!;

    this.canvasBackground.width = 1024;
    this.canvasBackground.height = 512;
    this.canvasGame.width = 1024;
    this.canvasGame.height = 512;

    this.toggleTilesInfoButton =
      document.querySelector<HTMLButtonElement>("#toggle-tiles-info")!;
  }

  addTowerMouseCursor = (tower: TowerConfig) => {
    this.appContainer.classList.add(tower.name);
  };

  removeAllClassesFromAppContainer = () => {
    this.appContainer.className = "";
  };

  private addChildToMenuTowersContainer = (child: HTMLElement) => {
    this.menuTowersContainer.appendChild(child);
  };

  createMenuItemTower = (tower: TowerConfig, clickHandler: () => void) => {
    const element = document.createElement("div");
    element.classList.add("menu-item");
    element.id = tower.name;

    events.selectedTowerEvent.addSelectedTowerEvent(element, clickHandler);
    this.addChildToMenuTowersContainer(element);
  };
}
