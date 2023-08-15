import { dom, game } from "../main";
import { getTileForClick } from "../utils/getTileForClick";
import { getTileForHover } from "../utils/getTileForHover";
import { TileGras } from "./tiles/TileGras";
import { TilePath } from "./tiles/TilePath";

export class CanvasGame {
  width = 1024;
  height = 512;
  canvas;
  ctx;

  previousTileForHover: TileGras | TilePath | null = null;

  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>("#canvas-game");
    if (canvas === null) throw new Error("Canvas not found");
    this.canvas = canvas;
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) throw new Error("Context not found");
    this.ctx = ctx;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.addEventListener("mousemove", this.mouseMoveCallback);
    this.canvas.addEventListener("mouseleave", this.mouseLeaveCallback);
    this.canvas.addEventListener("click", this.clickCallback);
  }

  getCanvas = () => {
    return this.canvas;
  };

  getCtx = () => {
    return this.ctx;
  };

  private mouseMoveCallback = (e: MouseEvent) => {
    this.showTowerBpOnTile(e);
  };

  private mouseLeaveCallback = (_e: MouseEvent) => {
    this.resetPreviousTileForHover();
  };

  private clickCallback = (e: MouseEvent) => {
    this.showTowerRange(e);
    this.placeTowerOnTile(e);
  };

  private showTowerBpOnTile = (e: MouseEvent) => {
    const selectedTower = game.menu.getSelectedTower();
    if (selectedTower === null) return;

    const tile = getTileForHover(e);
    if (this.previousTileForHover !== tile) {
      if (this.previousTileForHover instanceof TileGras) {
        // Remove the tower blue print from the previous tile
        this.previousTileForHover.setShowTowerBp(null);
      }
      if (tile instanceof TileGras && !tile.hasTower) {
        // show the tower blue print on the current tile and remove the mouse cursor image
        tile.setShowTowerBp(selectedTower);
        dom.removeAllClassesFromAppContainer();
        tile.update();
      }
      if (
        (tile instanceof TileGras && !tile.showTowerBP) ||
        tile instanceof TilePath
      ) {
        // add the mouse cursor image
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

  private placeTowerOnTile = (event: MouseEvent) => {
    const selectedTower = game.menu.getSelectedTower();
    if (selectedTower === null) return;

    const tile = getTileForClick(event);
    if (tile instanceof TileGras && !tile.hasTower) {
      game.towers.createTower(tile.x, tile.y, selectedTower);
      tile.setHasTower();
      tile.setShowTowerBp(null);
      tile.updateBG();

      game.menu.setSelectedTower(null);
      dom.removeAllClassesFromAppContainer();
    }
  };

  private showTowerRange = (event: MouseEvent) => {
    const tile = getTileForClick(event);
    if (
      tile instanceof TileGras &&
      tile.hasTower &&
      game.menu.getSelectedTower() === null
    ) {
      const tower = game.towers.getTowerForTile(tile.x, tile.y);
      tower?.setShowRange(true);
    }
  };
}
