import { DomController } from "./classes/DomController";
import { Game } from "./classes/Game";
import { ImageController } from "./classes/ImageController";
import { Tiles } from "./classes/Tiles";
import "./style.css";
import "./font-animation.css";
import { timeHasPassed } from "./utils/timeHasPassed";

export const imageController = new ImageController();

export let dom: DomController;
export let tiles: Tiles;
export let game: Game;

imageController.loadImages().then(() => {
  dom = new DomController();
  tiles = new Tiles();
  game = new Game();

  let lastAnimationTimestamp: number | null = null;
  const fps = 60;
  const intervalInMiliseconds = 1000 / fps;

  const runGame = (timestamp?: number) => {
    if (game.time === 10000) {
      console.log("end");
      return;
    }

    if (timestamp) {
      if (timeHasPassed(lastAnimationTimestamp, intervalInMiliseconds)) {
        lastAnimationTimestamp = timestamp;

        update();
      }
    } else {
      // initial run
      update();
    }

    game.time++;
    requestAnimationFrame(runGame);
  };

  const update = () => {
    dom.ctxGame.clearRect(0, 0, dom.canvasGame.width, dom.canvasGame.height);

    game.enemies.update();
    game.towers.update();
    tiles.update();
  };

  runGame();
});
