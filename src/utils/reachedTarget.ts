interface Position {
  x: number;
  y: number;
}

export const reachedTarget = (
  { x: currentX, y: currentY }: Position,
  { x: targetX, y: targetY }: Position
) => {
  if (
    (currentX - targetX - 1) * (currentX - targetX + 1) <= 0 &&
    (currentY - targetY - 1) * (currentY - targetY + 1) <= 0
  ) {
    return true;
  }

  return false;
};
