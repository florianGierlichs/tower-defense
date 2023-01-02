export const loadImage = async (src: string) => {
  const image = new Image(64, 64);
  image.src = src;
  await image.decode();
  return image;
};
