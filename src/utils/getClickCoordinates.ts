export const getClickCoordinates = (clickEvent: MouseEvent) => {
  return { x: clickEvent.offsetX, y: clickEvent.offsetY };
};
