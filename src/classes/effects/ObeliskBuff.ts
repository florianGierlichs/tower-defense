import shortUUID from "short-uuid";
import { Buff, TowerInstance } from "../../utils/types";
import { Obelisk } from "../towers/Obelisk";
import { Electrified } from "./Electrified";

interface ObeliskBuffProps {
  id: string;
  target: TowerInstance;
}

export class ObeliskBuff {
  id;
  target;
  duration = 10000;
  start;
  damageMultiplier = 1.2;

  electrified: Electrified | null = null;

  constructor({ id, target }: ObeliskBuffProps) {
    this.id = id;
    this.target = target;
    this.start = performance.now();

    this.add();
  }

  private add = () => {
    if (!(this.target instanceof Obelisk)) {
      // needs to be changed if more buff towers are added

      this.target.addBuffId(Buff.OBELISK_BUFF);
      this.target.addDamageBuffMultiplier(this.damageMultiplier);
      this.electrified = new Electrified({
        id: shortUUID.generate(),
        target: this.target,
      });
      this.target.drawImgBackground = this.electrified.update;
    }
  };

  remove = () => {
    if (!(this.target instanceof Obelisk)) {
      // needs to be changed if more buff towers are added

      this.target.removeBuffId(Buff.OBELISK_BUFF);
      this.target.removeDamageBuffMultiplier(this.damageMultiplier);
      this.target.drawImgBackground = null;
    }
  };
}
