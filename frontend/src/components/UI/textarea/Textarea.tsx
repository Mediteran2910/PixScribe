import Typography from "../typography/typography";
import "./textArea.css";

type ChangeEvt = React.ChangeEvent<HTMLTextAreaElement>;
type Props = {
  name: string;
  validate: string;
  onChange: (e: ChangeEvt) => void;
} & React.JSX.IntrinsicElements["textarea"];

export default function Textarea({
  name,
  validate,
  onChange,
  ...restProps
}: Props) {
  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} className="input-label">
            Enter description:
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
          {...restProps}
        ></textarea>
      </div>
    </>
  );
}
