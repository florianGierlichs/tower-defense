import { Game } from "./classes/Game";
import { TileGras } from "./classes/TileGras";
import "./style.css";
import { getTileForClick } from "./utils/getTileForClick";
import { timeHasPassed } from "./utils/timeHasPassed";

export const canvasBackground =
  document.querySelector<HTMLCanvasElement>("#canvas-background")!;
export const canvasGame =
  document.querySelector<HTMLCanvasElement>("#canvas-game")!;
export const ctxBackground = canvasBackground.getContext("2d")!;
export const ctxGame = canvasGame.getContext("2d")!;

canvasBackground.width = 1024;
canvasBackground.height = 512;
canvasGame.width = 1024;
canvasGame.height = 512;

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
  ctxGame.clearRect(0, 0, canvasGame.width, canvasGame.height);

  game.enemies.update();
  game.towers.update();
};

canvasGame.addEventListener("click", (e) => {
  const tile = getTileForClick(game.tiles.getTileRows(), e);
  console.log("tile", tile);

  game.towers.hideTowerRanger();
  if (tile instanceof TileGras && tile.hasTower) {
    const tower = game.towers.getTowerForTile(tile.x, tile.y);
    tower?.setShowRange(true);
  }

  if (tile instanceof TileGras && !tile.hasTower) {
    game.towers.createTower(tile.x, tile.y);
    tile.setHasTower();
  }
});

runGame();

// todo add tower blue print on tile and show tower range

const toggleTilesInfoButton =
  document.querySelector<HTMLButtonElement>("#toggle-tiles-info")!;

toggleTilesInfoButton.addEventListener("click", game.tiles.toggleDebug);

const app = document.querySelector<HTMLButtonElement>("#app")!;

const arcaneArcherMenuItem =
  document.querySelector<HTMLDivElement>("#arcaneArcherMenu")!;

arcaneArcherMenuItem.addEventListener("click", () => {
  app.classList.add("cursorArcaneArcher");
});
