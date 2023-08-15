import { CanvasBackground } from "./CanvasBackground";
import { CanvasContainer } from "./CanvasContainer";
import { CanvasGame } from "./CanvasGame";
import { DomBody } from "./DomBody";
import { GuiContainer } from "./GuiContainer";
import { ToggleGrid } from "./ToggleGrid";

export class DomController {
  guiContainer;
  canvasContainer;
  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;
  body;

  constructor() {
    // HTML containers
    this.guiContainer = new GuiContainer();
    this.canvasContainer = new CanvasContainer(
      this.guiContainer.getGuiContainer()
    );

    // canvas Background
    const canvasBackground = new CanvasBackground(
      this.canvasContainer.getCanvasContainer()
    );
    this.canvasBackground = canvasBackground.getCanvas();
    this.ctxBackground = canvasBackground.getCtx();

    // canvas Game
    const canvasGame = new CanvasGame(
      this.canvasContainer.getCanvasContainer()
    );
    this.canvasGame = canvasGame.getCanvas();
    this.ctxGame = canvasGame.getCtx();

    // toggle Grid
    new ToggleGrid();

    // body
    this.body = new DomBody();
  }
}
