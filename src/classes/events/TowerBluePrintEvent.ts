import { dom } from "../../main";
import { getTileForHover } from "../../utils/getTileForHover";
import { TowerName } from "../Game";
import { TileGras } from "../TileGras";
import { TilePath } from "../TilePath";

export class TowerBluePrintEvent {
  previousTileForHover: TileGras | TilePath | null = null;
  mouseMoveCallback: ((e: MouseEvent) => void) | null = null;

  constructor() {}

  private showTowerBpOnTile = (e: MouseEvent, selectedTower: TowerName) => {
    // todo prio no mouse cursor image while PB is shown, not sure where to put this
    const tile = getTileForHover(e);

    if (this.previousTileForHover !== tile) {
      if (this.previousTileForHover instanceof TileGras) {
        this.previousTileForHover?.setShowTowerBp(null);
      }

      if (tile instanceof TileGras && !tile.hasTower) {
        tile.setShowTowerBp(selectedTower);
        tile.update();
      }

      this.previousTileForHover = tile;
    }
  };

  private resetPreviousTileForHover = () => {
    if (this.previousTileForHover instanceof TileGras) {
      this.previousTileForHover.setShowTowerBp(null);
      this.previousTileForHover.updateBG();
    }
    this.previousTileForHover = null;
  };

  addTowerBluePrintMouseMoveEvent = (selectedTower: TowerName) => {
    this.mouseMoveCallback = (e: MouseEvent) => {
      this.showTowerBpOnTile(e, selectedTower);
    };

    dom.canvasGame.addEventListener("mousemove", this.mouseMoveCallback);

    dom.canvasGame.addEventListener(
      "mouseleave",
      this.resetPreviousTileForHover
    );
  };

  removeTowerBluePrintMouseMoveEvent = () => {
    if (this.mouseMoveCallback === null) {
      throw new Error("mouseMoveCallback is null");
    }

    dom.canvasGame.removeEventListener("mousemove", this.mouseMoveCallback);

    dom.canvasGame.removeEventListener(
      "mouseleave",
      this.resetPreviousTileForHover
    );
  };
}
