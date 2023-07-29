import { TileGras } from "../classes/TileGras";
import { TilePath } from "../classes/TilePath";
import { tiles } from "../main";
import { getMouseCoordinates } from "./getMouseCoordinates";

export const getTileForHover = (e: MouseEvent): TileGras | TilePath | null => {
  const rows = tiles.getTileRows();
  const { x: mouseX, y: mouseY } = getMouseCoordinates(e);
  let hoveredTile = null;

  rows.forEach((row) => {
    row.forEach((tile) => {
      if (
        mouseX >= tile.x &&
        mouseX <= tile.x + tile.width &&
        mouseY >= tile.y &&
        mouseY <= tile.y + tile.height
      ) {
        hoveredTile = tile;
      }
    });
  });

  return hoveredTile;
};
