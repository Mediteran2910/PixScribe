declare module "react-progressbar" {
  import * as React from "react";

  interface ProgressBarProps {
    completed: number;
    height: string;
    bgcolor: string;
    baseBgColor: string;
    labelAlignment: "center" | "left" | "right";
    label: string;
  }

  const ProgressBar: React.FC<ProgressBarProps>;

  export default ProgressBar;
}
