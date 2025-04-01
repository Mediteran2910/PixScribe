import Button from "../button/Button";

type Props = {
  isFilterOpen: boolean;
} & React.JSX.IntrinsicElements["span"];

type Scenario = {
  homepageFilterBtns: string[];
};
export default function Filter({ isFilterOpen, onClick }: Props) {
  const scenario: Scenario = {
    homepageFilterBtns: ["html", "json", "yaml", "last", "a-z"],
  };

  return (
    <>
      <Button color="light-grey" size="small" onClick={onClick}>
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
