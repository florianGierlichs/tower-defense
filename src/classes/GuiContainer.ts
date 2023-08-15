export class GuiContainer {
  guiContainer;

  constructor() {
    const guiContainer = document.getElementById("gui-container");
    if (guiContainer === null) {
      throw new Error("gui-container not found");
    }
    this.guiContainer = guiContainer;
  }

  getGuiContainer = () => {
    return this.guiContainer;
  };
}
