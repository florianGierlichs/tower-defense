export class GuiContainer {
  gameContainer;
  guiContainer;
  scaleInTransform = [{ transform: "scale(0.9)" }, { transform: "scale(1)" }];
  scaleInTiming = 150;

  constructor() {
    const gameContainer = document.getElementById("game-container");
    if (gameContainer === null) {
      throw new Error("game-container not found");
    }
    this.gameContainer = gameContainer;

    this.guiContainer = document.createElement("div");
    this.guiContainer.id = "gui-container";

    this.gameContainer.appendChild(this.guiContainer);

    this.guiContainer.animate(this.scaleInTransform, this.scaleInTiming);
  }

  getGuiContainer = () => {
    return this.guiContainer;
  };
}
