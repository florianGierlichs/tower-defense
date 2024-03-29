import { wrapper } from "../../main";

export class StartScreen {
  startScreen;
  startButton;
  buttonCallback;
  githubLink;

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
    this.startButton.classList.add("box-shadow", "play-button");
    this.startButton.innerText = "START";
    this.startButton.addEventListener("click", () => {
      this.removeStartScreen();
    });
    this.startScreen.appendChild(this.startButton);

    this.githubLink = document.createElement("a");
    this.githubLink.id = "github-link-start-screen";
    this.githubLink.href = "https://github.com/florianGierlichs/tower-defense";
    this.githubLink.target = "_blank";
    this.startScreen.appendChild(this.githubLink);

    wrapper.appendChild(this.startScreen);
  }

  private removeStartScreen() {
    this.startScreen.animate(this.scaleInTransform, this.scaleInTiming);
    setTimeout(() => {
      this.startScreen.remove();
      this.buttonCallback();
      const githubLink = document.getElementById("github-link");
      if (githubLink) {
        githubLink.style.display = "block";
      }
    }, this.scaleInTiming);
  }
}
