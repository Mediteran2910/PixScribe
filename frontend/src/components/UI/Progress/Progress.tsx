import { BarLoader } from "react-spinners";
import Typography from "../typography/typography";
import "./progress.css";

type Props = {
  proccesingCounter?: number;
  filesLength?: number;
  cooldown: boolean;
};

export default function Progress({
  proccesingCounter,
  filesLength,
  cooldown,
}: Props) {
  const isProccesing = proccesingCounter !== filesLength;

  return (
    <div className="progress-wrap">
      <Typography caption color="black">
        {`${
          cooldown
            ? "70s cooldown because api limit"
            : isProccesing
            ? "Processing images"
            : "Processing Completed"
        } ${proccesingCounter}/${filesLength}`}
      </Typography>
      <BarLoader
        color="#898989"
        width={100}
        loading={isProccesing ? true : false}
      />
    </div>
  );
}
