import { dom } from "../../main";

export class ModalPopIn {
  container;
  closeButton;
  lifeTime;
  timeOutId;
  onClose;

  scaleInTransformIn = [
    { transform: "translate(-50%, -50%) scale(0.5)" },
    { transform: "translate(-50%, -50%) scale(1)" },
  ];
  scaleInTransformOut = [
    { transform: "translate(-50%, -50%) scale(1)" },
    { transform: "translate(-50%, -50%) scale(0.5)" },
  ];
  scaleInTiming = 100;

  constructor(children: HTMLElement, onClose: () => void, lifeTime?: number) {
    this.lifeTime = lifeTime;
    this.onClose = onClose;

    this.container = document.createElement("div");
    this.container.id = "modal-pop-in-container";
    this.container.classList.add("box-shadow");

    this.closeButton = document.createElement("button");
    this.closeButton.id = "modal-pop-in-container__close-button";
    this.closeButton.addEventListener("click", () => {
      clearTimeout(this.timeOutId);
      this.remove();
    });

    this.container.appendChild(this.closeButton);
    this.container.appendChild(children);

    dom.body.body.appendChild(this.container);
    this.container.animate(this.scaleInTransformIn, this.scaleInTiming);

    if (lifeTime) {
      this.timeOutId = setTimeout(() => {
        this.remove();
      }, this.lifeTime);
    }
  }

  private remove = () => {
    this.container.animate(this.scaleInTransformOut, this.scaleInTiming);
    setTimeout(() => {
      this.container.remove();
    }, this.scaleInTiming);
    this.onClose();
  };
}
