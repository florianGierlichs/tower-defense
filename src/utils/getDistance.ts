import { Coordinate } from "./types";

export const getDistance = <T extends Coordinate, E extends Coordinate>(
  objectOne: T,
  objectTwo: E
) => {
  return Math.hypot(objectOne.x - objectTwo.x, objectOne.y - objectTwo.y);
};
