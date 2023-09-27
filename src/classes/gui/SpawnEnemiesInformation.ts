import { EnemyNames } from "../Waves";

export class SpawnEnemiesInformation {
  private container;

  constructor(enemyName: EnemyNames, bountyGold: number) {
    this.container = document.createElement("div");
    this.container.id = "spawn-enemies-container";

    const headline = document.createElement("h2");
    headline.id = "spawn-enemies-headline";
    headline.innerText = "Next Wave";

    const name = document.createElement("p");
    name.innerText = enemyName;

    const bounty = document.createElement("p");
    bounty.innerText = `Bounty Gold: ${bountyGold.toString()}`;

    this.container.appendChild(headline);
    this.container.appendChild(name);
    this.container.appendChild(bounty);
  }

  getContainer = () => {
    return this.container;
  };
}
