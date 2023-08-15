import { DomController } from "./classes/DomController";
import { Game } from "./classes/Game";
import { ImageController } from "./classes/ImageController";
import { Tiles } from "./classes/Tiles";
import "./style.css";
import "./font-animation.css";

export const imageController = new ImageController();

export let dom: DomController;
export let tiles: Tiles;
export let game: Game;

imageController.loadImages().then(() => {
  initiateGame();
});

const initiateGame = () => {
  // needed instances for Game
  dom = new DomController();
  tiles = new Tiles();

  game = new Game();
};
