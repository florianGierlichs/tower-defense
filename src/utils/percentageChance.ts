export const percentageChance = (percentage: number) => {
  return Math.random() <= percentage / 100;
};
