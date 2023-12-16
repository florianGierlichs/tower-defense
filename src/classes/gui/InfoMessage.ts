import { wrapper } from "../../main";

export class InfoMessage {
  element;

  scaleInTransformIn = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTransformOut = [
    { transform: "translate(-50%, -50%) scale(1)" },
    { transform: "translate(-50%, -50%) scale(0.5)" },
  ];
  scaleInTiming = 100;

  constructor(text: string) {
    this.element = document.createElement("h2");
    this.element.id = "info-message";
    this.element.innerHTML = text;
    wrapper.appendChild(this.element);
    this.element.animate(this.scaleInTransformIn, this.scaleInTiming);

    setTimeout(() => {
      this.remove();
    }, 1000);
  }

  private remove = () => {
    this.element.animate(this.scaleInTransformOut, this.scaleInTiming);
    setTimeout(() => {
      this.element.remove();
    }, this.scaleInTiming);
  };
}
