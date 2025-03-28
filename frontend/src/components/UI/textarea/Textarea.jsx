import Typography from "../typography/typography";
import "./textArea.css";

export default function Textarea({ name, validateDescription }) {
  return (
    <>
      <div className="input-wrapper">
        <div className="label-required">
          <label htmlFor={name} className="input-label">
            Enter description:
          </label>
          {validateDescription && (
            <Typography caption="caption-red">{validateDescription}</Typography>
          )}
        </div>
        <textarea
          name={name}
          id={name}
          placeholder="Your description goes here..."
        ></textarea>
      </div>
    </>
  );
}
