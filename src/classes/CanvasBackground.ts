export class CanvasBackground {
  width = 1024;
  height = 512;
  canvas;
  ctx;

  constructor(container: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "canvas-background";
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) throw new Error("Context not found");
    this.ctx = ctx;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    container.appendChild(this.canvas);
  }

  getCanvas = () => {
    return this.canvas;
  };

  getCtx = () => {
    return this.ctx;
  };
}
