export class EndScreen {
  endScreen;
  headline;
  result;

  wonText = "You won!";
  lostText = "You lost all your lives!";

  scaleInTransform = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTiming = 100;

  constructor() {
    this.endScreen = document.createElement("div");
    this.endScreen.id = "end-screen";
    this.endScreen.classList.add("box-shadow");

    this.headline = document.createElement("h2");
    this.headline.id = "end-screen-headline";
    this.headline.innerHTML = "GAME OVER";

    this.result = document.createElement("h2");
    this.result.id = "end-screen-result";
    this.result.innerHTML = this.wonText; // todo add condition if lost or won

    this.endScreen.appendChild(this.headline);
    this.endScreen.appendChild(this.result);

    document.body.appendChild(this.endScreen);

    this.endScreen.animate(this.scaleInTransform, this.scaleInTiming);
  }
}
