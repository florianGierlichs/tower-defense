import { CleanUpSelectTowerClickEvent } from "./events/CleanUpSelectTowerClickEvent";
import { PlaceTowerEvent } from "./events/PlaceTowerEvent";
import { TowerBluePrintEvent } from "./events/TowerBluePrintEvent";

export class DomEvents {
  constructor() {}

  towerBluePrintEvent = new TowerBluePrintEvent();
  placeTowerEvent = new PlaceTowerEvent();
  cleanUpSelectTowerClickEvent = new CleanUpSelectTowerClickEvent();
}
