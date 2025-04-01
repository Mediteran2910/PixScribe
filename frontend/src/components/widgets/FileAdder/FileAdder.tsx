import FileInput from "../../UI/FileInput/FileInput";
import Typography from "../../UI/typography/typography";
import "./FileAdder.css";

type Props = {
  filesName: "files";
  validateFile: string;
};
export default function FileAdder({ filesName, validateFile }: Props) {
  return (
    <div className="file-adder-el">
      <FileInput name={filesName} validate={validateFile}></FileInput>
      <Typography caption={true} color="medium-grey">
        max 15 images
      </Typography>
      <Typography caption={true} color="medium-grey">
        max size per image 10MB
      </Typography>
    </div>
  );
}
