export class SelectedTowerEvent {
  constructor() {}

  addSelectedTowerEvent = (
    element: HTMLDivElement,
    clickHandler: () => void
  ) => {
    const listnerCallback = (_e: MouseEvent) => {
      clickHandler();
    };
    element.addEventListener("click", listnerCallback);
  };
}
