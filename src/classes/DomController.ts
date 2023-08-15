import { MenuTower } from "../utils/types";
import { CanvasBackground } from "./CanvasBackground";
import { CanvasGame } from "./CanvasGame";

export class DomController {
  appContainer;

  menuTowersContainer;

  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;

  toggleTilesInfoButton;

  constructor() {
    this.appContainer = document.querySelector<HTMLDivElement>("#app")!;

    this.menuTowersContainer = document.querySelector<HTMLDivElement>(
      "#menu-towers-container"
    )!;

    // canvas Background
    const canvasBackground = new CanvasBackground();
    this.canvasBackground = canvasBackground.getCanvas();
    this.ctxBackground = canvasBackground.getCtx();

    // canvas Game
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
