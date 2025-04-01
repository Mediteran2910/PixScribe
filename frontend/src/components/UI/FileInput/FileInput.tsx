import "./fileInput.css";
import Typography from "../typography/typography";

type Props = {
  name: "files";
  validate: string;
} & React.JSX.IntrinsicElements["input"];

export default function FileInput({ name, validate, ...restProps }: Props) {
  return (
    <>
      <button className="choose-file-btn" type="button">
        <label htmlFor="file-input" className="choose-file-label">
          <img src="icons/Vector.png" alt="cloud vector for adding images" />
          Choose Files or Drag
        </label>
        {validate && (
          <Typography caption={true} color="red">
            {validate}
          </Typography>
        )}
        <input
          type="file"
          className="file-input"
          id="file-input"
          name={name}
          multiple
          accept="image/*"
          {...restProps}
        />
      </button>
    </>
  );
}
