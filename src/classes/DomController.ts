import { CanvasBackground } from "./CanvasBackground";
import { CanvasGame } from "./CanvasGame";
import { ToggleGrid } from "./ToggleGrid";

export class DomController {
  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;

  constructor() {
    // canvas Background
    const canvasBackground = new CanvasBackground();
    this.canvasBackground = canvasBackground.getCanvas();
    this.ctxBackground = canvasBackground.getCtx();

    // canvas Game
    const canvasGame = new CanvasGame();
    this.canvasGame = canvasGame.getCanvas();
    this.ctxGame = canvasGame.getCtx();

    // toggle Grid
    new ToggleGrid();
  }
}
