import shortUUID from "short-uuid";
import { TowerArcaneArcher } from "../classes/towers/TowerArcaneArcher";
import { TowerId } from "./types";
import { FireMage } from "../classes/towers/FireMage";

export const getTowerInstance = (towerId: TowerId, x: number, y: number) => {
  switch (towerId) {
    case TowerId.ARCANE_ARCHER:
      return new TowerArcaneArcher(shortUUID.generate(), x, y);
    case TowerId.FIRE_MAGE:
      return new FireMage(shortUUID.generate(), x, y);
    default:
      throw new Error("Tower not found");
  }
};
