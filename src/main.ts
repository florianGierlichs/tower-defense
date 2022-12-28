import { Game } from "./classes/Game";
import { TileGras } from "./classes/TileGras";
import "./style.css";
import { getTileForClick } from "./utils/getTileForClick";

export const canvasBackground =
  document.querySelector<HTMLCanvasElement>("#canvas-background")!;
export const canvasGame =
  document.querySelector<HTMLCanvasElement>("#canvas-game")!;
export const ctxBackground = canvasBackground.getContext("2d")!;
export const ctxGame = canvasGame.getContext("2d")!;

canvasBackground.width = 1300;
canvasBackground.height = 780;
canvasGame.width = 1300;
canvasGame.height = 780;

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
  ctxGame.clearRect(0, 0, canvasGame.width, canvasGame.height);

  game.towers.update();
  game.enemies.update();
};

canvasGame.addEventListener("click", (e) => {
  const tile = getTileForClick(game.tiles.getTileRows(), e);
  console.log("tile", tile);

  if (tile instanceof TileGras && !tile.hasTower) {
    game.towers.createTower(tile.x + 32, tile.y + 32);
    tile.setHasTower();
  }
});

runGame();

// todo add buildable tower for tile
// todo add show tower range on tile with tower
// todo add tower blue print on tile and show tower range
