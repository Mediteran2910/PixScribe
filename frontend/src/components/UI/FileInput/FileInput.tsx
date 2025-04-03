import "./fileInput.css";
import Typography from "../typography/typography";
import { placeholder } from "@codemirror/view";

type ChangeEvt = React.ChangeEvent<HTMLInputElement>;
type Props = {
  name: "files";
  validate: string;
  uploadedFiles?: number;
  onChange: (e: ChangeEvt) => void;
} & React.JSX.IntrinsicElements["input"];

const icons = {
  initial: {
    src: "icons/cloud-placeholder.png",
    alt: "cloud vector for adding images",
  },
  succes: {
    src: "icons/cloud-succes.png",
    alt: "green cloud vector with checkmark",
  },
};

export default function FileInput({
  name,
  validate,
  onChange,
  uploadedFiles,
  ...restProps
}: Props) {
  return (
    <>
      <button className="choose-file-btn" type="button">
        <label htmlFor="file-input" className="choose-file-label">
          <img
            src={uploadedFiles ? icons.succes.src : icons.initial.src}
            alt={uploadedFiles ? icons.succes.alt : icons.initial.alt}
          />
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
          onChange={onChange}
          {...restProps}
        />
      </button>
    </>
  );
}
