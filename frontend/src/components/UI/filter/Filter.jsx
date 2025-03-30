import Button from "../button/Button";
export default function Filter({ homepageFilter, onClick }) {
  const scenario = {
    homepageSort: ["html", "json", "yaml", "last", "a-z"],
  };

  return (
    <>
      <Button color="light-grey" size="small" onClick={onClick}>
        {homepageFilter ? "<" : "sort"}
      </Button>
      {homepageFilter &&
        scenario.homepageSort.map((s) => (
          <Button outline="black" size="small">
            {s}
          </Button>
        ))}
    </>
  );
}
