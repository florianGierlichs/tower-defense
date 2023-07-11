export const getMouseCoordinates = (event: MouseEvent) => {
  return { x: event.offsetX, y: event.offsetY };
};
