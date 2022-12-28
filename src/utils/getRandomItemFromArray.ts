export const getRandomItemFromArray = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
