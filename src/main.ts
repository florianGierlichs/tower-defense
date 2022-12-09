import { Game } from "./classes/Game";
import "./style.css";
import { getTileForClick } from "./utils/getTileForClick";

export const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
export const ctx = canvas.getContext("2d")!;

canvas.width = 1300;
canvas.height = 780;

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
    game.tiles.createTileGrid();
    update();
  }

  game.time++;
  requestAnimationFrame(runGame);
};

const update = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.tiles.update();
  game.drawPath();
  game.towers.update();
  game.enemies.update();
};

canvas.addEventListener("click", (e) => {
  const tile = getTileForClick(game.tiles.getTileRows(), e);
  console.log("tile", tile);
});

runGame();
