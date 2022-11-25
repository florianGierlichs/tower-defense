import { Game } from "./classes/Game";
import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
export const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const game = new Game();

const startTime = performance.now();
let lastAnimationTimestamp = startTime;
const fps = 60;
const intervalInMiliseconds = 1000 / fps;

const runGame = (timestamp?: number) => {
  if (game.time === 5000) {
    console.log("end");
    return;
  }

  if (timestamp) {
    const elapsedTime = timestamp - lastAnimationTimestamp;

    if (elapsedTime >= intervalInMiliseconds) {
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.drawPath();
  game.towers.update();
  game.enemies.update();
};

runGame();
