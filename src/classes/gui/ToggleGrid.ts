import { tiles } from "../../main";

export class ToggleGrid {
  toggleTilesInfoButton;

  constructor() {
    const toggleTilesInfoButton =
      document.querySelector<HTMLButtonElement>("#toggle-tiles-info");
    if (toggleTilesInfoButton === null)
      throw new Error("toggleTilesInfoButton not found");

    this.toggleTilesInfoButton = toggleTilesInfoButton;

    this.toggleTilesInfoButton.addEventListener("click", this.toggleGrid);
  }

  private toggleGrid = () => {
    tiles.drawGrid();
    gtag("event", "click", {
      event_category: "button",
      event_label: "toggle grid",
    });
  };
}
