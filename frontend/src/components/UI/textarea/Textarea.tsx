import Typography from "../typography/typography";
import "./textArea.css";

type ChangeEvt = React.ChangeEvent<HTMLTextAreaElement>;
type Props = {
  name: string;
  validate: string;
  value: string;
  editing: boolean;
  size?: "full" | "half" | "quater";
  onChange: (e: ChangeEvt) => void;
} & React.JSX.IntrinsicElements["textarea"];

export default function Textarea({
  name,
  validate,
  value,
  editing,
  size,
  onChange,
  ...restProps
}: Props) {
  const classes = [];

  if (size) classes.push(`${size}-size`);

  const classNames = classes.map((c) => `txtArea-${c}`).join(" ");

  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} style={{ marginBottom: "5px" }}>
            <Typography label color="light-grey">
              {editing ? "Update description" : "Enter description"}
            </Typography>
          </label>
          {validate && (
            <Typography caption={true} color="red">
              {validate}
            </Typography>
          )}
        </div>
        <textarea
          name={name}
          id={name}
          placeholder="Your description goes here..."
          onChange={onChange}
          value={value}
          {...restProps}
          className={`txtArea ${classNames}`}
        ></textarea>
      </div>
    </>
  );
}
