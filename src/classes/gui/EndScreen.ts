import { Result, ResultType } from "../../utils/types";
import { ModalPopIn } from "./ModalPopIn";

export class EndScreen {
  endScreen;
  headline;
  resultElement;
  result;
  buttonContainer;
  playButton;

  wonText = "You won!";
  lostText = "You lost all your lifes!";

  scaleInTransform = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTiming = 100;

  constructor(result: Result) {
    this.result = result;

    this.endScreen = document.createElement("div");

    this.headline = document.createElement("h2");
    this.headline.id = "end-screen-headline";
    this.headline.innerHTML = "GAME OVER";

    this.resultElement = document.createElement("h2");
    this.resultElement.id = "end-screen-result";
    this.resultElement.innerHTML =
      this.result === ResultType.WON ? this.wonText : this.lostText;

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.id = "end-screen-button-container";

    this.playButton = document.createElement("button");
    this.playButton.id = "play-again-button";
    this.playButton.classList.add("box-shadow", "play-button");
    this.playButton.innerText = "Play again";
    this.playButton.addEventListener("click", () => location.reload());

    this.buttonContainer.appendChild(this.playButton);

    this.endScreen.appendChild(this.headline);
    this.endScreen.appendChild(this.resultElement);
    this.endScreen.appendChild(this.buttonContainer);

    new ModalPopIn({
      children: this.endScreen,
      onTimeout: () => location.reload(),
    });
  }
}
