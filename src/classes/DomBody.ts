import { game } from "../main";
import { getTileForHover } from "../utils/getTileForHover";
import { MenuTower } from "../utils/types";
import { TileGras } from "./tiles/TileGras";

export class DomBody {
  body;

  constructor() {
    const body = document.querySelector<HTMLBodyElement>("body");
    if (body === null) throw new Error("Body not found");
    this.body = body;

    this.body.addEventListener("contextmenu", this.contextmenuCallback);
    this.body.addEventListener("click", this.clickCallback, true);
    this.body.addEventListener("mousemove", this.mouseMoveCallback);
  }

  private contextmenuCallback = (event: MouseEvent) => {
    event.preventDefault();
    game.resetEventListeners();
  };

  private clickCallback = (_event: MouseEvent) => {
    game.towers.hideTowerRange();
  };

  private mouseMoveCallback = (event: MouseEvent) => {
    this.showTowerMouseCursor(event);
  };

  private showTowerMouseCursor = (event: MouseEvent) => {
    const selectedTower = game.menu.getSelectedTower();
    const tile = getTileForHover(event);
    if (selectedTower !== null) {
      if (
        (tile instanceof TileGras && tile.showTowerBP === null) ||
        tile === null
      ) {
        this.addTowerMouseCursor(selectedTower);
      }
    }
  };

  addTowerMouseCursor = (tower: MenuTower) => {
    this.body.classList.add(tower.id);
  };

  removeAllClassesFromBody = () => {
    this.body.className = "";
  };
}
