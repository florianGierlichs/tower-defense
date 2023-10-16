import { EnemyConfig } from "../../utils/types";

export class SpawnEnemiesInformation {
  private container;

  constructor({
    name,
    health,
    bountyGold,
    speed,
    maxSlowPercentage,
    special,
  }: EnemyConfig) {
    this.container = document.createElement("div");
    this.container.id = "spawn-enemies-container";

    const headline = document.createElement("h2");
    headline.id = "spawn-enemies-headline";
    headline.innerText = "Next Wave";
    this.container.appendChild(headline);

    this.createInfo(name);
    if (special) {
      this.createInfo(`Special: ${special.description}`);
    }

    this.createStats("Health:", health.toString());
    this.createStats("Bounty Gold:", bountyGold.toString());
    this.createStats("Speed:", speed.toString());
    this.createStats("Max slow:", `${maxSlowPercentage.toString()}%`);
  }

  getContainer = () => {
    return this.container;
  };

  private createInfo = (text: string) => {
    const element = document.createElement("p");
    element.innerText = text;
    this.container.appendChild(element);
  };

  private createStats = (key: string, value: string) => {
    const p = document.createElement("p");
    p.classList.add("enemy-stats-text");

    const keyEl = document.createElement("span");
    keyEl.classList.add("enemy-stats-key");
    keyEl.innerText = key;
    p.appendChild(keyEl);

    const valueEl = document.createElement("span");
    valueEl.innerText = value;
    p.appendChild(valueEl);

    this.container.appendChild(p);
  };
}
