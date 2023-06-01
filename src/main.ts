import { DomController } from "./classes/DomController";
import { Game } from "./classes/Game";
import "./style.css";
import { timeHasPassed } from "./utils/timeHasPassed";

export const dom = new DomController();
export const game = new Game();

let lastAnimationTimestamp: number | null = null;
const fps = 60;
const intervalInMiliseconds = 1000 / fps;

const runGame = (timestamp?: number) => {
  if (game.time === 5000) {
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
  game.menu.update();
};

runGame();
