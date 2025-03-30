import "./input.css";
import Typography from "../typography/typography";

export default function Input({ name, validateTitle, ...restProps }) {
  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} className="input-label">
            Enter title:
          </label>
          {validateTitle && (
            <Typography caption="caption" color="red">
              {validateTitle}
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
