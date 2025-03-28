export const decimalToInteger = (
  decimal: number,
  multiplier: number = 10
): number => {
  if (Number.isInteger(decimal)) {
    return decimal;
  }
  return Math.round(decimal * multiplier);
};

export const roundToOneDecimal = (num: number) => {
  if (!num) return;
  return parseFloat(num.toFixed(1));
};

export const formatVoteAverage = (num: number, defaultText = "暂无评分") => {
  const average = roundToOneDecimal(num);
  if (!average) return;
  return average > 0 ? average : defaultText;
};

export const minutesToMinutesHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursPart = hours > 0 ? `${hours}h` : "";
  const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}m` : "";
  return `${hoursPart}${minutesPart}`;
};
