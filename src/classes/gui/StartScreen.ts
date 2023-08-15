export class StartScreen {
  startScreen;
  startButton;
  buttonCallback;
  scaleInTransform = [
    { transform: "translate(-50%, -50%) scale(1)" },
    { transform: "translate(-50%, -50%) scale(0.9)" },
  ];
  scaleInTiming = 100;

  constructor(buttonCallback: () => void) {
    this.buttonCallback = buttonCallback;

    this.startScreen = document.createElement("div");
    this.startScreen.id = "start-screen";
    this.startScreen.classList.add("box-shadow");

    this.startButton = document.createElement("button");
    this.startButton.id = "start-button";
    this.startButton.classList.add("box-shadow");
    this.startButton.innerHTML = "START";
    this.startButton.addEventListener("click", () => {
      this.removeStartScreen();
    });

    this.startScreen.appendChild(this.startButton);

    document.body.appendChild(this.startScreen);
  }

  private removeStartScreen() {
    this.startScreen.animate(this.scaleInTransform, this.scaleInTiming);
    setTimeout(() => {
      this.startScreen.remove();
      this.buttonCallback();
    }, this.scaleInTiming);
  }
}
