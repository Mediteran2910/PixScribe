import "./input.css";
import Typography from "../typography/typography";

type ChangeEvt = React.ChangeEvent<HTMLInputElement>;
type Props = {
  name: string;
  validate: string;
  value: string;
  editing: boolean;
  inputSize?: "full" | "half" | "quater";
  onChange: (e: ChangeEvt) => void;
} & React.JSX.IntrinsicElements["input"];

export default function Input({
  name,
  validate,
  onChange,
  value,
  editing,
  inputSize,
  ...restProps
}: Props) {
  const classes = [];

  if (inputSize) classes.push(`${inputSize}-size`);

  const classNames = classes.map((c) => `inputTxt-${c}`).join(" ");

  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} style={{ marginBottom: "5px" }}>
            <Typography label color="light-grey">
              {editing ? "Update title" : "Enter title"}
            </Typography>
          </label>
          {validate && (
            <Typography caption={true} color="red">
              {validate}
            </Typography>
          )}
        </div>

        <input
          type="text"
          name={name}
          id={name}
          value={value}
          {...restProps}
          className={`inputTxt ${classNames}`}
          onChange={onChange}
        />
      </div>
    </>
  );
}
