import { CountdownCircleTimer } from "react-countdown-circle-timer";

type Props = {
  isPlaying: boolean;
  duration: number;
  size: number;
  strokeWidth: number;
  onComplete: () => { shouldRepeat: boolean };
};

export default function Countdown({
  isPlaying,
  duration,
  size,
  strokeWidth,
  onComplete,
}: Props) {
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={duration}
      colors="#000000"
      size={size}
      strokeWidth={strokeWidth}
      onComplete={onComplete}
    >
      {({ remainingTime }) => (
        <div style={{ fontSize: "24px" }}>{remainingTime}s</div>
      )}
    </CountdownCircleTimer>
  );
}
