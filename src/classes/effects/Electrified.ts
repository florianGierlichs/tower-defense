import { main } from "../../main";
import { EffectId, TowerInstance } from "../../utils/types";
import { ImageFrameLoop } from "../ImageFrameLoop";

interface ElectrifiedProps {
  id: string;
  target: TowerInstance;
}

export class Electrified {
  id;
  private target;

  imageFrameLoop;

  constructor({ id, target }: ElectrifiedProps) {
    this.id = id;
    this.target = target;

    this.imageFrameLoop = new ImageFrameLoop({
      image: main.imageController.getImage(EffectId.ELECTRIFIED),
      frames: 5,
      animationIterationCircleTime: 500,
      sWidth: 144,
      sHeight: 144,
      imageScale: 0.4,
      imageTranslateCorrection: {
        x: 4,
        y: 5,
      },
      target: this.target,
    });
  }

  update = () => {
    this.imageFrameLoop.update();
  };
}
