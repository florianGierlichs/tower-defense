export const drawEnemy = (context: CanvasRenderingContext2D, enemy: any) => {
  context.beginPath();
  context.arc(enemy.x, enemy.y, 10, 0, Math.PI * 2);
  context.fillStyle = enemy.color;
  context.fill();
};
