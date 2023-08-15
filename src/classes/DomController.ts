import { CanvasBackground } from "./CanvasBackground";
import { CanvasGame } from "./CanvasGame";
import { DomBody } from "./DomBody";
import { ToggleGrid } from "./ToggleGrid";

export class DomController {
  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;
  body;

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

    // body
    this.body = new DomBody();
  }
}
