import { getDistance } from "./getDistance";
import { Coordinate, TowerInstance } from "./types";

interface GetTowersInRangeProps {
  towers: TowerInstance[];
  center: Coordinate;
  range: number;
}

export const filterTowersInRange = ({
  towers,
  center,
  range,
}: GetTowersInRangeProps) => {
  const towersInRange = towers.filter((tower) => {
    const distance = getDistance(center, tower.tileMiddle);
    return distance < range;
  });
  return towersInRange;
};
