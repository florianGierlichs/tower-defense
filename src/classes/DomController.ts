import { events } from "../main";
import { TowerType } from "./Game";

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

  addClassToAppContainer = (className: string) => {
    this.appContainer.classList.add(className);
  };

  removeAllClassesFromAppContainer = () => {
    this.appContainer.className = "";
  };

  private addChildToMenuTowersContainer = (child: HTMLElement) => {
    this.menuTowersContainer.appendChild(child);
  };

  createMenuItemTower = (name: TowerType, clickHandler: () => void) => {
    const element = document.createElement("div");
    element.classList.add("menu-item");
    element.id = name;

    events.selectedTowerEvent.addSelectedTowerEvent(element, clickHandler);
    // element.addEventListener("click", listnerCallback);
    this.addChildToMenuTowersContainer(element);
  };
}
