import shortUUID from "short-uuid";
import { Buff, TowerInstance } from "../../utils/types";
import { Obelisk } from "../towers/Obelisk";
import { Electrified } from "./Electrified";
import { Electrify } from "./Electrify";

interface ObeliskBuffProps {
  id: string;
  target: TowerInstance;
  source: Obelisk;
}

export class ObeliskBuff {
  id;
  target;
  duration = 10000;
  start;
  damageMultiplier = 1.2;

  buffAnmiation; // shoot animation of the obelisk
  electrifiedAnmiation: Electrified | null = null; // electrified animation of the buffed tower

  constructor({ id, target, source }: ObeliskBuffProps) {
    this.id = id;
    this.target = target;
    this.start = performance.now();

    this.buffAnmiation = new Electrify({
      id: shortUUID.generate(),
      target: source,
    });

    this.add();
  }

  private add = () => {
    if (!(this.target instanceof Obelisk)) {
      // needs to be changed if more buff towers are added

      this.target.addBuffId(Buff.OBELISK_BUFF);
      this.target.addDamageBuffMultiplier(this.damageMultiplier);
      this.electrifiedAnmiation = new Electrified({
        id: shortUUID.generate(),
        target: this.target,
      });
      this.target.drawImgBackground = this.electrifiedAnmiation.update;
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

  update = () => {
    this.buffAnmiation.update();
  };
}
