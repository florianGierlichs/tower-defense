export const drawTower = (context: CanvasRenderingContext2D, tower: any) => {
  context.beginPath();
  context.lineWidth = 5;
  context.fillStyle = tower.color;
  context.fillRect(tower.x, tower.y, tower.width, tower.height);
  context.stroke();
};
