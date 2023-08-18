import { Result, ResultType } from "../../utils/types";

export class EndScreen {
  endScreen;
  headline;
  resultElement;
  result;

  wonText = "You won!";
  lostText = "You lost all your lives!";

  scaleInTransform = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTiming = 100;

  constructor(result: Result) {
    this.result = result;

    this.endScreen = document.createElement("div");
    this.endScreen.id = "end-screen";
    this.endScreen.classList.add("box-shadow");

    this.headline = document.createElement("h2");
    this.headline.id = "end-screen-headline";
    this.headline.innerHTML = "GAME OVER";

    this.resultElement = document.createElement("h2");
    this.resultElement.id = "end-screen-result";
    this.resultElement.innerHTML =
      this.result === ResultType.WON ? this.wonText : this.lostText;

    this.endScreen.appendChild(this.headline);
    this.endScreen.appendChild(this.resultElement);

    document.body.appendChild(this.endScreen);

    this.endScreen.animate(this.scaleInTransform, this.scaleInTiming);
  }
}
