import { Game } from "./classes/Game";
import { Tile } from "./classes/Tile";
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

//runGame();

const tilesTotal = 20 * 12;

const rows: Tile[][] = [];

for (let i = 0, row = []; i < tilesTotal; i++) {
  row.push(
    new Tile(i, (i % 20) * 64 + (i % 20), rows.length * 64 + (rows.length % 20))
  );
  if (row.length === 20) {
    rows.push(row);

    row = [];
  }
}

rows.forEach((row) => {
  row.forEach((tile) => {
    tile.update();
  });
});

function calcClickPosition() {
  const { width: cWidth, height: cHeight } = canvas;
  const getSize = () => canvas.getBoundingClientRect();

  return (clickEvent: MouseEvent) => {
    const { width, height } = getSize();

    const xRatio = cWidth / width;
    const yRatio = cHeight / height;

    return { x: clickEvent.offsetX * xRatio, y: clickEvent.offsetY * yRatio };
  };
}

canvas.addEventListener("click", (e) => {
  const clickCords = calcClickPosition()(e);
  console.log(clickCords);
  rows.forEach((row) => {
    row.forEach((tile) => {
      if (
        clickCords.x >= tile.x &&
        clickCords.x <= tile.x + 64 &&
        clickCords.y >= tile.y &&
        clickCords.y <= tile.y + 64
      ) {
        tile.log();
      }
    });
  });
});
