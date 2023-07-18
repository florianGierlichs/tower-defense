import { CleanUpSelectTowerClickEvent } from "./events/CleanUpSelectTowerClickEvent";
import { PlaceTowerEvent } from "./events/PlaceTowerEvent";
import { SelectedTowerEvent } from "./events/SelectTowerEvent";
import { TowerBluePrintEvent } from "./events/TowerBluePrintEvent";

export class DomEvents {
  constructor() {}

  towerBluePrintEvent = new TowerBluePrintEvent();
  placeTowerEvent = new PlaceTowerEvent();
  cleanUpSelectTowerClickEvent = new CleanUpSelectTowerClickEvent();
  selectedTowerEvent = new SelectedTowerEvent();
}
