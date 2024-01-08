const formatLongString = (
  stringValue: string,
  desiredLength: number
): string => {
  let formattedString = "";
  if (stringValue.length > desiredLength) {
    formattedString = stringValue.substring(0, desiredLength) + "...";
  } else {
    formattedString = stringValue;
  }
  return formattedString;
};

export { formatLongString };
