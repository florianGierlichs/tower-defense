interface ToastProps {
  children: HTMLElement;
}

export class Toast {
  container;
  scaleInTransformOut = [
    { transform: "translateX(0)" },
    { transform: "translateX(-100%)" },
  ];
  scaleInTimingOut = 300;

  scaleInTransformIn = [
    { transform: "translateX(-100%)" },
    { transform: "translateX(0)" },
  ];
  scaleInTimingIn = 300;

  constructor({ children }: ToastProps) {
    this.container = document.createElement("div");
    this.container.id = "toast";
    this.container.classList.add("box-shadow");

    this.container.appendChild(children);

    document.body.appendChild(this.container);

    this.container.animate(this.scaleInTransformIn, this.scaleInTimingIn);
  }

  close = () => {
    this.container.animate(this.scaleInTransformOut, this.scaleInTimingOut);
    setTimeout(() => {
      this.container.remove();
    }, this.scaleInTimingOut);
  };
}
