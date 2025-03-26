import Typography from "../typography/typography";
import "./textArea.css";

export default function Textarea({ name, validateDescription }) {
  return (
    <>
      <div className="input-wrapper">
        <label htmlFor={name} className="input-label">
          Enter description:
          {validateDescription && (
            <Typography>{validateDescription}</Typography>
          )}
        </label>
        <textarea
          name={name}
          id={name}
          placeholder="Your description goes here..."
        ></textarea>
      </div>
    </>
  );
}
