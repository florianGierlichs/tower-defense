import { Coordinate } from "./types";

export const getTileMiddle = ({
  x: xTile,
  y: yTile,
}: Coordinate): Coordinate => {
  const x = xTile + 64 / 2;
  const y = yTile + 64 / 2;

  return { x, y };
};
