import { Game } from "../Game";

export class WaveDefeatedScreen {
  game;
  container;
  headline;

  scaleInTransformIn = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTransformOut = [
    { transform: "translate(-50%, -50%) scale(1)" },
    { transform: "translate(-50%, -50%) scale(0.5)" },
  ];
  scaleInTiming = 100;

  constructor(game: Game) {
    this.game = game;

    this.container = document.createElement("div");
    this.container.id = "round-complete-container";
    this.container.classList.add("box-shadow");

    this.headline = document.createElement("h2");
    this.headline.id = "round-complete-headline";
    this.headline.innerHTML = "Wave Defeated";
    this.container.appendChild(this.headline);

    const bountyGold = this.game.gold.getCollectedBountyGoldPerRound();
    const percentageGold = this.game.gold.getPercentageGoldIncreasePerRound();
    const staticGold = this.game.gold.staticGoldIncrease;
    const totalGold = bountyGold + percentageGold + staticGold;

    this.createGoldIncreaseText(
      "Bounty Gold this round:",
      bountyGold.toString()
    );

    this.createGoldIncreaseText(
      "10% of current Gold:",
      percentageGold.toString()
    );

    this.createGoldIncreaseText("Static Gold increase:", staticGold.toString());

    this.createGoldIncreaseText("Total Gold increase:", totalGold.toString());

    document.body.appendChild(this.container);

    this.container.animate(this.scaleInTransformIn, this.scaleInTiming);

    setTimeout(() => {
      this.remove();
    }, 5000);
  }

  private remove = () => {
    this.container.animate(this.scaleInTransformOut, this.scaleInTiming);
    setTimeout(() => {
      this.container.remove();
    }, this.scaleInTiming);
  };

  private createGoldIncreaseText = (key: string, value: string) => {
    const p = document.createElement("p");
    p.classList.add("round-complete-text");
    const keyEl = document.createElement("span");
    keyEl.classList.add("round-complete-text-key");
    const valueEl = document.createElement("span");
    valueEl.classList.add("round-complete-text-value");
    keyEl.innerHTML = key;
    valueEl.innerHTML = value;
    p.appendChild(keyEl);
    p.appendChild(valueEl);
    this.container.appendChild(p);
  };
}
