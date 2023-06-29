import { TileGras } from "../classes/TileGras";
import { TilePath } from "../classes/TilePath";
import { game } from "../main";
import { getMouseCoordinates } from "./getClickCoordinates";

export const getTileForClick = (e: MouseEvent): TileGras | TilePath | null => {
  const rows = game.tiles.getTileRows();
  const { x: clickX, y: clickY } = getMouseCoordinates(e);
  let clickedTile = null;

  rows.forEach((row) => {
    row.forEach((tile) => {
      if (
        clickX >= tile.x &&
        clickX <= tile.x + tile.width &&
        clickY >= tile.y &&
        clickY <= tile.y + tile.height
      ) {
        clickedTile = tile;
      }
    });
  });

  return clickedTile;
};
