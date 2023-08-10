interface IsInsideAreaProps {
  center: { x: number; y: number };
  radius: number;
  target: { x: number; y: number };
}

export const isInsideArea = ({ center, radius, target }: IsInsideAreaProps) => {
  const distance = Math.sqrt(
    Math.pow(target.x - center.x, 2) + Math.pow(target.y - center.y, 2)
  );
  return distance <= radius;
};
