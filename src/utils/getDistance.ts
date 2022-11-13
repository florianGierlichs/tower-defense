export const getDistance = (objectOne: any, objectTwo: any) => {
  return Math.hypot(objectOne.x - objectTwo.x, objectOne.y - objectTwo.y);
};
