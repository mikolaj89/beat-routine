type CountdownData = {
    minutes: number;
    seconds: number;
}

const minutesToSeconds = (minutes: number): number => {
  return Math.floor(minutes * 60);
};

const getCountdownData = (totalSeconds: number): CountdownData => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return { minutes, seconds };
};

const getTimeString = ({ minutes, seconds }: CountdownData): string => {
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  return `${minutesStr}:${secondsStr}`;
}

const getFormattedTime = (totalSeconds: number): string => {
  const { minutes, seconds } = getCountdownData(totalSeconds);
  return getTimeString({ minutes, seconds });
}

export { minutesToSeconds, getCountdownData, getTimeString, getFormattedTime };