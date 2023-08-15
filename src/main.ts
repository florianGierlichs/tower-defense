import { DomController } from "./classes/DomController";
import { Game } from "./classes/Game";
import { ImageController } from "./classes/ImageController";
import { Tiles } from "./classes/Tiles";
import "./style.css";
import "./font-animation.css";
import { LoadingScreen } from "./classes/LoadingScreen";

export let dom: DomController;
export let tiles: Tiles;
export let game: Game;

class Main {
  loadingScreen;
  imageController;

  constructor() {
    // loading screen
    this.loadingScreen = new LoadingScreen();

    // load images
    this.imageController = new ImageController();
    this.imageController.loadImages().then(() => {
      this.loadingScreen.removeLoadingScreen();

      // show Start Screen/Menu with button to start game
      this.initiateGame();
    });
  }

  private initiateGame = () => {
    // needed instances for Game
    dom = new DomController();
    tiles = new Tiles();

    game = new Game();
  };
}

const main = new Main();

export { main };
