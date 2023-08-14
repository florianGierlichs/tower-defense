import { MenuTower } from "../utils/types";
import { CanvasGame } from "./CanvasGame";

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
      document.querySelector<HTMLCanvasElement>("#canvas-background")!; // todo add CanvasBackground class

    this.ctxBackground = this.canvasBackground.getContext("2d")!;

    this.canvasBackground.width = 1024;
    this.canvasBackground.height = 512;

    const canvasGame = new CanvasGame();
    this.canvasGame = canvasGame.getCanvas();
    this.ctxGame = canvasGame.getCtx();

    this.toggleTilesInfoButton =
      document.querySelector<HTMLButtonElement>("#toggle-tiles-info")!;
  }

  addTowerMouseCursor = (tower: MenuTower) => {
    this.appContainer.classList.add(tower.id);
  };

  removeAllClassesFromAppContainer = () => {
    this.appContainer.className = "";
  };

  addChildToMenuTowersContainer = (child: HTMLElement) => {
    this.menuTowersContainer.appendChild(child);
  };
}
