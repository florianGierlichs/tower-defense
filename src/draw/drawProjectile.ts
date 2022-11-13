export const drawProjectile = (
  context: CanvasRenderingContext2D,
  projectile: any
) => {
  context.beginPath();
  context.arc(projectile.x, projectile.y, projectile.width, 0, Math.PI * 2);
  context.fillStyle = "pink";
  context.fill();
};
