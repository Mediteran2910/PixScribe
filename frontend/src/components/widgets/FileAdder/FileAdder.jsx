import FileInput from "../../UI/FileInput/FileInput";
import Typography from "../../UI/typography/typography";
import Button from "../../UI/button/Button";
import "./FileAdder.css";
export default function FileAdder({ type, filesName, validateFile }) {
  return (
    <div className="file-adder-el">
      <FileInput filesName={filesName} validateFile={validateFile}></FileInput>
      <Typography caption="caption" color="medium-grey">
        max 15 images
      </Typography>
      <Typography caption="caption-grey" color="medium-grey">
        max size per image 10MB
      </Typography>
    </div>
  );
}
