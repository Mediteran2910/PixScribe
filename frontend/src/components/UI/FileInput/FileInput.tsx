import "./fileInput.css";
import Typography from "../typography/typography";
import { placeholder } from "@codemirror/view";
import Button from "../button/Button";

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
  const classes: string[] = [];

  if (!uploadedFiles) {
    classes.push("choose");
  } else classes.push("add");

  const classNames = classes.map((c) => `${c}-files`).join("");
  return (
    <>
      <button className="choose-file-btn" type="button">
        <label htmlFor="file-input" className={classNames}>
          {!uploadedFiles ? (
            <>
              <img src={icons.initial.src} alt={icons.initial.alt} />
              Choose files or drag
            </>
          ) : (
            "Add more"
          )}
        </label>
        {/* {validate && (
          <Typography caption={true} color="red">
            {validate}
          </Typography>
        )} */}
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
