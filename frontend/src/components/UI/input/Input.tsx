import "./input.css";
import Typography from "../typography/typography";

type Props = {
  name: string;
  validate: string;
} & React.JSX.IntrinsicElements["input"];

export default function Input({ name, validate, ...restProps }: Props) {
  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} className="input-label">
            Enter title:
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
          {...restProps}
          className="input-create-title"
        />
      </div>
    </>
  );
}
