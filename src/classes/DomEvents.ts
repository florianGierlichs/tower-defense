import { dom } from "../main";
import { getTileForHover } from "../utils/getTileForHover";
import { TowerName } from "./Game";
import { TileGras } from "./TileGras";
import { TilePath } from "./TilePath";

export class DomEvents {
  previousTileForHover: TileGras | TilePath | null = null;

  mouseMoveCallback: ((e: MouseEvent) => void) | null = null;

  constructor() {}

  // mouseMove show tower blueprint event start

  private showTowerBpOnTile = (e: MouseEvent, selectedTower: TowerName) => {
    const tile = getTileForHover(e);

    if (this.previousTileForHover !== tile) {
      if (this.previousTileForHover instanceof TileGras) {
        this.previousTileForHover?.setShowTowerBp(null);
      }

      if (tile instanceof TileGras && !tile.hasTower) {
        tile.setShowTowerBp(selectedTower);
        tile.update();

        this.previousTileForHover = tile;
      }
    }
  };

  private resetPreviousTileForHover = () => {
    this.previousTileForHover = null;
  };

  addMouseMoveEvent = (selectedTower: TowerName) => {
    this.mouseMoveCallback = (e: MouseEvent) => {
      this.showTowerBpOnTile(e, selectedTower);
    };

    dom.canvasGame.addEventListener("mousemove", this.mouseMoveCallback);

    dom.canvasGame.addEventListener(
      "mouseleave",
      this.resetPreviousTileForHover
    );
  };

  removeMouseMoveEvent = () => {
    if (this.mouseMoveCallback === null) {
      throw new Error("mouseMoveCallback is null");
    }

    dom.canvasGame.removeEventListener("mousemove", this.mouseMoveCallback);

    dom.canvasGame.removeEventListener(
      "mouseleave",
      this.resetPreviousTileForHover
    );
  };

  // mouseMove show tower blueprint event end

  // click select tower event start

  // ...

  // click select tower event end
}
