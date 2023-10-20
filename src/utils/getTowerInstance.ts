import shortUUID from "short-uuid";
import { ArcaneArcher } from "../classes/towers/ArcaneArcher";
import { TowerId } from "./types";
import { FireMage } from "../classes/towers/FireMage";
import { LightningMage } from "../classes/towers/LightningMage";

export const getTowerInstance = (towerId: TowerId, x: number, y: number) => {
  switch (towerId) {
    case TowerId.ARCANE_ARCHER:
      return new ArcaneArcher(shortUUID.generate(), x, y);
    case TowerId.FIRE_MAGE:
      return new FireMage(shortUUID.generate(), x, y);
    case TowerId.Lightning_MAGE:
      return new LightningMage(shortUUID.generate(), x, y);
    default:
      throw new Error("Tower not found");
  }
};
