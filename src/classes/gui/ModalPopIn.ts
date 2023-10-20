import { dom } from "../../main";

interface ModalPopInProps {
  children: HTMLElement;
  onTimeout: () => void;
  onClose?: () => void;
  lifeTime?: number;
}

export class ModalPopIn {
  container;
  closeButton;
  lifeTime;
  timeOutId;
  onTimeout;
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

  constructor({ children, onTimeout, onClose, lifeTime }: ModalPopInProps) {
    this.lifeTime = lifeTime;
    this.onTimeout = onTimeout;
    this.onClose = onClose;

    this.container = document.createElement("div");
    this.container.id = "modal-pop-in-container";
    this.container.classList.add("box-shadow");

    this.closeButton = document.createElement("button");
    this.closeButton.id = "modal-pop-in-container__close-button";
    this.closeButton.addEventListener("click", () => {
      clearTimeout(this.timeOutId);
      this.remove();
      this.onClose ? this.onClose() : this.onTimeout();
    });

    this.container.appendChild(this.closeButton);
    this.container.appendChild(children);

    dom.body.body.appendChild(this.container);
    this.container.animate(this.scaleInTransformIn, this.scaleInTiming);

    if (lifeTime) {
      this.timeOutId = setTimeout(() => {
        this.remove();
        this.onTimeout();
      }, this.lifeTime);
    }
  }

  private remove = () => {
    this.container.animate(this.scaleInTransformOut, this.scaleInTiming);
    setTimeout(() => {
      this.container.remove();
    }, this.scaleInTiming);
  };
}
