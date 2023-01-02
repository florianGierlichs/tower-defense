export const timeHasPassed = (
  lastTimestamp: number | null,
  throttleTime: number
) => {
  const timestamp = performance.now();
  if (!lastTimestamp || timestamp - lastTimestamp >= throttleTime) {
    return true;
  }
  return false;
};
