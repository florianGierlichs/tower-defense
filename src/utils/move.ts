interface MoveProps {
  distance: number;
  angle: number;
}

export const moveX = ({ distance, angle }: MoveProps) => {
  return distance * Math.cos((angle * Math.PI) / 180);
};

export const moveY = ({ distance, angle }: MoveProps) => {
  return distance * Math.sin((angle * Math.PI) / 180);
};
