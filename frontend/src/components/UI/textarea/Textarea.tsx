import Typography from "../typography/typography";
import "./textArea.css";

type Props = {
  name: string;
  validate: string;
} & React.JSX.IntrinsicElements["textarea"];

export default function Textarea({ name, validate, ...restProps }: Props) {
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
          {...restProps}
        ></textarea>
      </div>
    </>
  );
}
