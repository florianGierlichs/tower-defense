import { TileGras } from "../classes/TileGras";
import { TilePath } from "../classes/TilePath";
import { TileRow } from "../classes/Tiles";
import { getClickCoordinates } from "./getClickCoordinates";

export const getTileForClick = (
  rows: TileRow[],
  e: MouseEvent
): TileGras | TilePath | null => {
  const { x: clickX, y: clickY } = getClickCoordinates(e);

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
