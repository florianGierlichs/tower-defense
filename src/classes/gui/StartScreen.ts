export class StartScreen {
  startScreen;
  startButton;
  buttonCallback;

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
      this.buttonCallback();
    });

    this.startScreen.appendChild(this.startButton);

    document.body.appendChild(this.startScreen);
  }

  private removeStartScreen() {
    document.body.removeChild(this.startScreen);
  }
}
