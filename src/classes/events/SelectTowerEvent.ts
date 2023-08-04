export class SelectedTowerEvent {
  constructor() {}
  // prio todo when clicking menu item twice you can place infinite towers, some listener needs to be removed
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
