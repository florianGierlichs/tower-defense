export const drawPath = (
  context: CanvasRenderingContext2D,
  nodes: number[][]
) => {
  context.beginPath();
  context.lineWidth = 20;
  context.strokeStyle = "black";
  context.moveTo(0, 100);
  nodes.forEach((node) => {
    context.lineTo(node[0], node[1]);
  });
  context.stroke();
};
