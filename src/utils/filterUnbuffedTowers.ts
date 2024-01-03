import { Obelisk } from "../classes/towers/Obelisk";
import { Buff, TowerInstance } from "./types";

export const filterUnbuffedTowers = (towers: TowerInstance[]) => {
  const unbuffedTowers = towers.filter((tower) => {
    if (tower instanceof Obelisk) {
      // only find non buff towers
      return false;
    }
    return !tower.buffs.has(Buff.OBELISK_BUFF);
  });
  return unbuffedTowers;
};
