import { dom, game } from "../../main";
import { TowerName } from "../Game";

export class PlaceTowerEvent {
  placeTowerClickCallback: ((e: MouseEvent) => void) | null = null;

  constructor() {}

  addPlaceTowerClickEvent = (tower: TowerName) => {
    this.placeTowerClickCallback = (e: MouseEvent) => {
      if (this.placeTowerClickCallback === null) {
        throw new Error("placeTowerClickCallback is null");
      }
      game.placeTowerOnTile(e, tower);
      dom.canvasGame.removeEventListener("click", this.placeTowerClickCallback);
    };
    dom.canvasGame.addEventListener("click", this.placeTowerClickCallback);
  };
}
