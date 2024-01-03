import { main } from "../../main";
import { EffectId, TowerInstance } from "../../utils/types";
import { ImageFrameSingle } from "../ImageFrameSingle";

interface ElectrifyProps {
  id: string;
  target: TowerInstance;
}

export class Electrify {
  id;
  private target;

  imageFrameLoop;

  constructor({ id, target }: ElectrifyProps) {
    this.id = id;
    this.target = target;

    this.imageFrameLoop = new ImageFrameSingle({
      image: main.imageController.getImage(EffectId.ELECTRIFY),
      frames: 8,
      animationIterationCircleTime: 800,
      sWidth: 230,
      sHeight: 230,
      imageScale: 0.25,
      imageTranslateCorrection: {
        x: 3,
        y: 3,
      },
      target: this.target,
    });
  }

  update = () => {
    this.imageFrameLoop.update();
  };
}
