const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let start = { x: 50, y: 20 };
let cp1 = { x: 230, y: 100 };
let cp2 = { x: 150, y: 150 };
let end = { x: 60, y: 200 };

let object = { x: start.x, y: start.y };
let duration = 2000; // Duration of the animation in milliseconds
let startTime: number | null = null;

function animate(timestamp: number) {
  if (startTime === null) {
    startTime = timestamp;
  }

  end = { x: end.x + 1, y: end.y + 1 };

  let elapsed = timestamp - startTime;
  let progress = Math.min(elapsed / duration, 1);

  // Calculate the object's new position along the curve
  let t = progress;
  let x =
    (1 - t) * (1 - t) * (1 - t) * start.x +
    3 * (1 - t) * (1 - t) * t * cp1.x +
    3 * (1 - t) * t * t * cp2.x +
    t * t * t * end.x;
  let y =
    (1 - t) * (1 - t) * (1 - t) * start.y +
    3 * (1 - t) * (1 - t) * t * cp1.y +
    3 * (1 - t) * t * t * cp2.y +
    t * t * t * end.y;

  object.x = x;
  object.y = y;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the curve
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  ctx.stroke();

  // Draw the object at its new position
  ctx.beginPath();
  ctx.arc(object.x, object.y, 5, 0, 2 * Math.PI);
  ctx.fill();

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
