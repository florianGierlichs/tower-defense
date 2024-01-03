import { TowerInstance } from "./types";

export const findRandomTower = (towers: TowerInstance[]) => {
  if (towers.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * towers.length);
  return towers[randomIndex];
};
