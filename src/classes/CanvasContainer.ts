export class CanvasContainer {
  canvasBorder;
  canvasContainer;

  constructor(container: HTMLElement) {
    this.canvasBorder = document.createElement("div");
    this.canvasBorder.id = "canvas-border";

    this.canvasContainer = document.createElement("div");
    this.canvasContainer.id = "canvas-container";

    this.canvasBorder.appendChild(this.canvasContainer);

    container.appendChild(this.canvasBorder);
  }

  getCanvasContainer = () => {
    return this.canvasContainer;
  };
}
