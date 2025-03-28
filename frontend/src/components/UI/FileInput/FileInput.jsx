import "./fileInput.css";
import Typography from "../typography/typography";

export default function FileInput({ filesName, validateFile, ...restProps }) {
  return (
    <>
      <button className="choose-file-btn" type="button">
        <label htmlFor="file-input" className="choose-file-label">
          <img src="icons/Vector.png" alt="cloud vector for adding images" />
          Choose Files or Drag
        </label>
        {validateFile && (
          <Typography caption="caption-red">{validateFile}</Typography>
        )}
        <input
          type="file"
          className="file-input"
          id="file-input"
          name={filesName}
          multiple
          accept="image/*"
          {...restProps}
        />
      </button>
    </>
  );
}
