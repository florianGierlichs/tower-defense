import { TowerConfig } from "../../data/towerConfig";
import { dom } from "../../main";
import { getTileForHover } from "../../utils/getTileForHover";
import { TileGras } from "../TileGras";
import { TilePath } from "../TilePath";

export class TowerBluePrintEvent {
  previousTileForHover: TileGras | TilePath | null = null;
  mouseMoveCallback: ((e: MouseEvent) => void) | null = null;
  mouseLeaveCallback: ((e: MouseEvent) => void) | null = null;

  constructor() {}

  private showTowerBpOnTile = (e: MouseEvent, selectedTower: TowerConfig) => {
    const tile = getTileForHover(e);

    if (this.previousTileForHover !== tile) {
      if (this.previousTileForHover instanceof TileGras) {
        this.previousTileForHover?.setShowTowerBp(null);
      }

      if (tile instanceof TileGras && !tile.hasTower) {
        tile.setShowTowerBp(selectedTower);
        dom.removeAllClassesFromAppContainer();
        tile.update();
      }

      if (
        (tile instanceof TileGras && !tile.showTowerBP) ||
        tile instanceof TilePath
      ) {
        dom.addTowerMouseCursor(selectedTower);
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

  addTowerBluePrintMouseMoveEvent = (selectedTower: TowerConfig) => {
    this.mouseMoveCallback = (e: MouseEvent) => {
      this.showTowerBpOnTile(e, selectedTower);
    };

    this.mouseLeaveCallback = (_e: MouseEvent) => {
      this.resetPreviousTileForHover();
      dom.addTowerMouseCursor(selectedTower);
    };

    dom.canvasGame.addEventListener("mousemove", this.mouseMoveCallback);
    dom.canvasGame.addEventListener("mouseleave", this.mouseLeaveCallback);
  };

  removeTowerBluePrintMouseMoveEvent = () => {
    if (this.mouseMoveCallback === null) {
      throw new Error("mouseMoveCallback is null");
    }
    if (this.mouseLeaveCallback === null) {
      throw new Error("mouseLeaveCallback is null");
    }

    dom.canvasGame.removeEventListener("mousemove", this.mouseMoveCallback);
    dom.canvasGame.removeEventListener("mouseleave", this.mouseLeaveCallback);
  };
}
