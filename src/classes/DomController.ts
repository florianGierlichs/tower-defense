import { CanvasBackground } from "./CanvasBackground";
import { CanvasGame } from "./CanvasGame";

export class DomController {
  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;

  toggleTilesInfoButton;

  constructor() {
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
}
