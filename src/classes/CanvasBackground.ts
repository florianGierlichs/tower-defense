export class CanvasBackground {
  width = 1024;
  height = 512;
  canvas;
  ctx;

  constructor() {
    const canvas =
      document.querySelector<HTMLCanvasElement>("#canvas-background");
    if (canvas === null) throw new Error("Canvas not found");
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) throw new Error("Context not found");
    this.ctx = ctx;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  getCanvas = () => {
    return this.canvas;
  };

  getCtx = () => {
    return this.ctx;
  };
}
