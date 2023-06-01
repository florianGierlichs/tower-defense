export class DomController {
  body;

  canvasBackground;
  canvasGame;
  ctxBackground;
  ctxGame;

  toggleTilesInfoButton;

  constructor() {
    this.body = document.querySelector<HTMLBodyElement>("body")!;

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
}
