interface TranslatedCanvasDestinationProps {
  imageScale: number;
  sourceSize: number;
  translateCorrection: number;
}

export const getTranslatedCanvasDestination = ({
  imageScale,
  sourceSize,
  translateCorrection,
}: TranslatedCanvasDestinationProps) => {
  const destinationAndSourceDifference = imageScale * sourceSize - sourceSize;
  return -(destinationAndSourceDifference / 2) + translateCorrection;
};
