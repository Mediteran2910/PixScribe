import { useState } from "react";
import Button from "../button/Button";
import { toogle } from "../../../utils/toogle";

type Scenario = {
  homepageFilterBtns: string[];
};
export default function Filter({}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const scenario: Scenario = {
    homepageFilterBtns: ["html", "json", "yaml", "last", "a-z"],
  };

  return (
    <>
      <Button
        color="light-grey"
        size="small"
        onClick={() => toogle(setIsFilterOpen)}
      >
        {isFilterOpen ? "<" : "sort"}
      </Button>
      {isFilterOpen &&
        scenario.homepageFilterBtns.map((s) => (
          <Button outline="black" size="small">
            {s}
          </Button>
        ))}
    </>
  );
}
