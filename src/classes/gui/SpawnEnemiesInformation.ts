import { EnemyNames } from "../Waves";

export class SpawnEnemiesInformation {
  private container;

  constructor(enemyName: EnemyNames, bountyGold: number) {
    this.container = document.createElement("div");
    this.container.id = "spawn-enemies-container";

    const headline = document.createElement("h2");
    headline.id = "spawn-enemies-headline";
    headline.innerText = "Next Wave";
    this.container.appendChild(headline);

    this.createInfo(enemyName);
    this.createInfo(`Bounty Gold: ${bountyGold.toString()}`);
  }

  getContainer = () => {
    return this.container;
  };

  private createInfo = (text: string) => {
    const element = document.createElement("p");
    element.innerText = text;
    this.container.appendChild(element);
  };
}
