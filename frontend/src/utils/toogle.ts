import { Dispatch, SetStateAction } from "react";

export const toogle = (setState: Dispatch<SetStateAction<boolean>>) => {
  setState((prev) => !prev);
};
