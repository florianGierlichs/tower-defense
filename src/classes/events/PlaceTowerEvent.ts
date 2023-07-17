import { dom, game } from "../../main";
import { getTileForClick } from "../../utils/getTileForClick";
import { TowerName } from "../Game";
import { TileGras } from "../TileGras";

export class PlaceTowerEvent {
  placeTowerClickCallback: ((e: MouseEvent) => void) | null = null;

  constructor() {}

  addPlaceTowerClickEvent = (tower: TowerName) => {
    this.placeTowerClickCallback = (e: MouseEvent) => {
      if (this.placeTowerClickCallback === null) {
        throw new Error("placeTowerClickCallback is null");
      }
      this.placeTowerOnTile(e, tower);
      dom.canvasGame.removeEventListener("click", this.placeTowerClickCallback);
    };
    dom.canvasGame.addEventListener("click", this.placeTowerClickCallback);
  };

  private placeTowerOnTile = (event: MouseEvent, tower: TowerName) => {
    const tile = getTileForClick(event);
    if (tile instanceof TileGras && !tile.hasTower) {
      game.towers.createTower(tile.x, tile.y, tower);
      tile.setHasTower();
      tile.setShowTowerBp(null);
      tile.updateBG();
    }
  };
}
