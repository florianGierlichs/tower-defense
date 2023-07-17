import { dom, game } from "../../main";

export class CleanUpSelectTowerClickEvent {
  constructor() {}

  addCleanUpSelectTowerClickEvent = () => {
    dom.appContainer.addEventListener(
      "click",
      this.CleanUpSelectTowerClickEvent,
      true
    );
  };

  private CleanUpSelectTowerClickEvent = () => {
    // todo add right mouse button to also cleanup
    game.menu.setSelectedTower(null);
    game.events.towerBluePrintEvent.removeTowerBluePrintMouseMoveEvent();
    dom.appContainer.removeEventListener(
      "click",
      this.CleanUpSelectTowerClickEvent,
      true
    );
  };
}
