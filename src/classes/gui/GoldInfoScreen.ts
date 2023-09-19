import { createStatsText } from "../../utils/createStatsText";

export class GoldInfoScreen {
  container;

  constructor(percentageGoldIncrease: number, staticGoldIncrease: number) {
    this.container = document.createElement("div");
    this.container.classList.add(
      "tower-stats-container",
      "box-shadow",
      "gold-info"
    );

    createStatsText(this.container, "Gold increase per round");
    createStatsText(
      this.container,
      `+ ${percentageGoldIncrease}% of current gold`
    );
    createStatsText(this.container, `+ ${staticGoldIncrease} static gold`);
    createStatsText(this.container, "");
    createStatsText(this.container, "Bounty gold per kill");
    createStatsText(
      this.container,
      "Each kill grants a bounty gold. The bounty amount gets decreased for every corner waypoint the enemy has passed."
    );
  }

  getContainer = () => {
    return this.container;
  };
}
